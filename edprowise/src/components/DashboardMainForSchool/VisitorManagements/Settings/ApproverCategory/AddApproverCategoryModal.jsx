import React, { useState, useEffect } from "react";

const AddApproverCategoryModal = ({ mode, category, onSave }) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (mode === "edit" && category) {
      setCategoryName(category.name);
    } else {
      setCategoryName("");
    }
  }, [mode, category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim() === "") return;
    onSave(categoryName);

    // Close modal programmatically after save
    const modalElement = document.getElementById("categoryModal");
    const modal = window.bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  };

  return (
    <div
      className="modal fade"
      id="categoryModal"
      tabIndex="-1"
      aria-labelledby="categoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title" id="categoryModalLabel">
                {mode === "add" ? "Add Category" : "Update Category"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
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

export default AddApproverCategoryModal;
