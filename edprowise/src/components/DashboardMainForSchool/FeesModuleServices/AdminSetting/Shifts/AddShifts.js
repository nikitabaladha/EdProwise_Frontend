import React, { useState } from 'react';

const AddShifts = () => {
  const [shifts, setShifts] = useState([
    { shiftName: '', startTime: '', endTime: '' },
  ]);

  const handleAddShift = () => {
    setShifts([...shifts, { shiftName: '', startTime: '', endTime: '' }]);
  };

  const handleDeleteShift = (index) => {
    setShifts(shifts.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedShifts = [...shifts];
    updatedShifts[index][field] = value;
    setShifts(updatedShifts);
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
                    Add Shift
                  </h4>
                </div>
              </div>
              <form>
                {shifts.map((shift, index) => (
                  <div className="row align-items-center" key={index}>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor={`shiftName-${index}`} className="form-label">
                          Shift Name
                        </label>
                        <input
                          type="text"
                          id={`shiftName-${index}`}
                          name="shiftName"
                          className="form-control"
                          value={shift.shiftName}
                          onChange={(e) => handleInputChange(index, 'shiftName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor={`startTime-${index}`} className="form-label">
                          Start Time
                        </label>
                        <input
                          type="time"
                          id={`startTime-${index}`}
                          name="startTime"
                          className="form-control"
                          value={shift.startTime}
                          onChange={(e) => handleInputChange(index, 'startTime', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor={`endTime-${index}`} className="form-label">
                          End Time
                        </label>
                        <input
                          type="time"
                          id={`endTime-${index}`}
                          name="endTime"
                          className="form-control"
                          value={shift.endTime}
                          onChange={(e) => handleInputChange(index, 'endTime', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-3 text-center">
                      <button
                        type="button"
                        className="btn btn-danger mt-3"
                        onClick={() => handleDeleteShift(index)}
                        disabled={shifts.length === 1} // Prevent deleting the last row
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                <div className="text-center mb-3">
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={handleAddShift}
                  >
                    Add more Shifts
                  </button>
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Create Shift
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

export default AddShifts;
