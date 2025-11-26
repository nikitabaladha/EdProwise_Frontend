import React, { useState, useEffect } from "react";

const AddLocationModal = ({ mode, category, onSave }) => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [landmark, setLandmark] = useState("");

  // when editing, fill form with existing values
  useEffect(() => {
    if (mode === "edit" && category) {
      setPickupLocation(category.pickupLocation || "");
      setDropLocation(category.dropLocation || "");
      setLandmark(category.landmark || "");
    } else {
      setPickupLocation("");
      setDropLocation("");
      setLandmark("");
    }
  }, [mode, category]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickupLocation || !dropLocation) {
      alert("Pickup and Drop locations are required.");
      return;
    }

    const newData = {
      id: category ? category.id : Date.now(),
      pickupLocation,
      dropLocation,
      landmark,
    };

    onSave(newData);
    // Close modal manually
    window.bootstrap.Modal.getInstance(
      document.getElementById("locationModal")
    ).hide();
  };

  return (
    <div
      className="modal fade"
      id="locationModal"
      tabIndex="-1"
      aria-labelledby="locationModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit} style={{width:"80%"}}>
            <div className="modal-header py-2">
              <h4 className="modal-title" id="locationModalLabel">
                {mode === "add" ? "Add Location" : "Edit Location"}
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Pickup Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Drop Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Landmark</label>
                <input
                  type="text"
                  className="form-control"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {mode === "add" ? "Add" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLocationModal;
