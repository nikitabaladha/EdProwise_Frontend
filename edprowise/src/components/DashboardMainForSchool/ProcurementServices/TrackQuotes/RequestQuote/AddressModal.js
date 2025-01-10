import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CityData from "../../../../CityData.json";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const AddressModal = ({ onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState({
    deliveryAddress: "B-503 Saga Residence, 1st Floor, Sector 15",
    deliveryLocation: "Noida, Uttar Pradesh, India",
    pinCode: "300003",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => `${city}, ${state}, India`)
  );

  const handleSave = () => {
    setIsEditing(false);
    onClose(); // Close modal after saving
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="card m-2">
                <div className="card-body custom-heading-padding">
                  <div className="container">
                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Your Current Address Details
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="deliveryAddress" className="form-label">
                          Delivery Address
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="deliveryAddress"
                            value={address.deliveryAddress}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                          <p className="form-control">
                            {address.deliveryAddress}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label
                          htmlFor="deliveryLocation"
                          className="form-label"
                        >
                          Delivery Location
                        </label>
                        {isEditing ? (
                          <select
                            id="deliveryLocation"
                            name="deliveryLocation"
                            className="form-control"
                            value={address.deliveryLocation}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select City-State-Country</option>
                            {cityOptions.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <p className="form-control">
                            {address.deliveryLocation}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="pinCode" className="form-label">
                          Pin Code
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="pinCode"
                            value={address.pinCode}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                          <p className="form-control">{address.pinCode}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isEditing ? (
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        ) : (
          <Button variant="primary" onClick={toggleEditMode}>
            Edit Address
          </Button>
        )}
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressModal;
