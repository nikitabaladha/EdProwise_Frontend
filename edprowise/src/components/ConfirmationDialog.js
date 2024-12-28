import React from "react";
import { toast } from "react-toastify";
import deleteAPI from "../api/deleteAPI";

const DELETE_CONFIG = {
  school: {
    getEndpoint: (id) => `/school/${id}`,
    successMessage: "School successfully deleted!",
    errorMessage: "Failed to delete school.",
    idKey: "schoolId",
  },
  user: {
    getEndpoint: (id) => `/user/${id}`,
    successMessage: "User successfully deleted!",
    errorMessage: "Failed to delete user.",
    idKey: "userId",
  },
  subscription: {
    getEndpoint: (id) => `/subscription/${id}`,
    successMessage: "Subscription successfully deleted!",
    errorMessage: "Failed to delete subscription.",
    idKey: "schoolId",
  },
};

const ConfirmationDialog = ({ onClose, deleteType, id, onDeleted }) => {
  const handleDelete = async () => {
    const config = DELETE_CONFIG[deleteType];

    if (!config) {
      console.error("Invalid delete type.");
      toast.error("Invalid delete type.");
      return;
    }

    if (!id) {
      console.error(`${config.idKey} is missing.`);
      toast.error(`${config.idKey} is required.`);
      return;
    }

    const endpoint = config.getEndpoint(id);

    try {
      const response = await deleteAPI(endpoint, {}, true);

      if (!response.hasError) {
        console.log(`${deleteType} deleted successfully`, response.data);
        toast.success(config.successMessage);

        if (typeof onDeleted === "function") {
          onDeleted(id);
        }

        onClose();
      } else {
        console.error(config.errorMessage, response.message);
        toast.error(`${config.errorMessage}: ${response.message}`);
      }
    } catch (error) {
      console.error(`Error while deleting ${deleteType}:`, error);
      toast.error(`An error occurred while deleting the ${deleteType}.`);
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target.id === "overlay") {
      onClose();
    }
  };

  return (
    <div
      id="overlay"
      className="swal2-container swal2-center swal2-backdrop-show"
      style={{ overflowY: "auto" }}
      onClick={handleOverlayClick}
    >
      <div
        aria-labelledby="swal2-title"
        aria-describedby="swal2-html-container"
        className="swal2-popup swal2-modal swal2-icon-warning swal2-show"
        tabIndex={-1}
        role="dialog"
        aria-live="assertive"
        aria-modal="true"
        style={{ display: "grid" }}
      >
        <button
          type="button"
          className="swal2-close"
          aria-label="Close this dialog"
          style={{ display: "none" }}
        >
          ×
        </button>
        <ul className="swal2-progress-steps" style={{ display: "none" }} />
        <div
          className="swal2-icon swal2-warning swal2-icon-show"
          style={{ display: "flex" }}
        >
          <div className="swal2-icon-content">!</div>
        </div>
        <img className="swal2-image" style={{ display: "none" }} />
        <h2
          className="swal2-title"
          id="swal2-title"
          style={{ display: "block" }}
        >
          Are you sure?
        </h2>
        <div
          className="swal2-html-container"
          id="swal2-html-container"
          style={{ display: "block" }}
        >
          You won't be able to revert this!
        </div>
        <input className="swal2-input" style={{ display: "none" }} />
        <input type="file" className="swal2-file" style={{ display: "none" }} />
        <div className="swal2-range" style={{ display: "none" }}>
          <input type="range" />
          <output />
        </div>
        <select className="swal2-select" style={{ display: "none" }} />
        <div className="swal2-radio" style={{ display: "none" }} />
        <label
          htmlFor="swal2-checkbox"
          className="swal2-checkbox"
          style={{ display: "none" }}
        >
          <input type="checkbox" />
          <span className="swal2-label" />
        </label>
        <textarea
          className="swal2-textarea"
          style={{ display: "none" }}
          defaultValue={""}
        />
        <div
          className="swal2-validation-message"
          id="swal2-validation-message"
          style={{ display: "none" }}
        />
        <div className="swal2-actions" style={{ display: "flex" }}>
          <div className="swal2-loader" />
          <button
            type="button"
            className="swal2-confirm btn btn-primary w-xs me-2 mt-2"
            aria-label=""
            style={{ display: "inline-block" }}
            onClick={handleDelete}
          >
            Yes, delete it!
          </button>
          <button
            type="button"
            className="swal2-deny"
            aria-label=""
            style={{ display: "none" }}
          >
            No
          </button>
          <button
            type="button"
            className="swal2-cancel btn btn-danger w-xs mt-2"
            aria-label=""
            style={{ display: "inline-block" }}
            onClick={onClose}
          >
            No, cancel!
          </button>
        </div>
        <div className="swal2-footer" style={{ display: "none" }} />
        <div className="swal2-timer-progress-bar-container">
          <div
            className="swal2-timer-progress-bar"
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
