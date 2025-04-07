import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CityData from "../../../../CityData.json";
import { Modal, Button } from "react-bootstrap";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";
import Select from "react-select";

const AddressModal = ({ onClose, cart, formData }) => {
  const navigate = useNavigate();
  const [school, setSchool] = useState(null);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");

  const fetchSchoolData = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId;

    if (!schoolId) {
      console.error("School ID not found in localStorage");
      return;
    }

    try {
      const response = await getAPI(`/school-profile/${schoolId}`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        setSchool(response.data.data);
        console.log("school data from header", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching School:", err);
    }
  };

  useEffect(() => {
    fetchSchoolData();

    setExpectedDeliveryDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSchool((prevSchool) => ({
      ...prevSchool,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    setExpectedDeliveryDate(e.target.value);
  };

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => ({
      value: `${city}, ${state}, India`,
      label: `${city}, ${state}, India`,
    }))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const products = cart.map((item) => {
      const productData = {
        categoryId: item.categoryId,
        subCategoryId: item.subCategoryId,
        description: item.description,
        unit: item.unit,
        quantity: item.quantity,
      };
      return productData;
    });

    const data = {
      deliveryAddress: school?.deliveryAddress,
      deliveryLocation: school?.deliveryLocation,
      deliveryLandMark: school?.deliveryLandMark,
      deliveryPincode: school?.deliveryPincode,
      expectedDeliveryDate: expectedDeliveryDate,
    };

    const formDataToSend = new FormData();

    formDataToSend.append("products", JSON.stringify(products));
    formDataToSend.append("data", JSON.stringify(data));

    cart.forEach((item, index) => {
      if (item.productImage) {
        formDataToSend.append(
          `products[${index}][productImage]`,
          item.productImage
        );
      }
    });

    console.log("FormData Entries:");
    for (const pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await postAPI(
        "/request-quote",
        formDataToSend,
        { "Content-Type": "multipart/form-data" },
        true
      );

      if (!response.hasError) {
        toast.success("Quote Requested successfully");
        onClose();
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to request quote");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered dialogClassName="custom-modal">
      <Modal.Body className="modal-body-scrollable">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
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
                      <div className="mb-2">
                        <label htmlFor="deliveryAddress" className="form-label">
                          Delivery Address{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="deliveryAddress"
                          value={school?.deliveryAddress}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-2">
                        <label
                          htmlFor="deliveryLocation"
                          className="form-label"
                        >
                          Delivery Location{" "}
                          <span className="text-danger">*</span>
                        </label>

                        <Select
                          id="deliveryLocation"
                          name="deliveryLocation"
                          options={cityOptions}
                          value={cityOptions.find(
                            (option) =>
                              option.value === school?.deliveryLocation
                          )}
                          onChange={(selectedOption) =>
                            setSchool((prev) => ({
                              ...prev,
                              deliveryLocation: selectedOption
                                ? selectedOption.value
                                : "",
                            }))
                          }
                          placeholder="Select City-State-Country"
                          isSearchable
                          required
                          classNamePrefix="react-select"
                          className="custom-react-select"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-2">
                        <label htmlFor="landMark" className="form-label">
                          Landmark <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="deliveryLandMark"
                          value={school?.deliveryLandMark}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-2">
                        <label htmlFor="deliveryPincode" className="form-label">
                          Pin Code <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="deliveryPincode"
                          value={school?.deliveryPincode}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-2">
                        <label
                          htmlFor="expectedDeliveryDate"
                          className="form-label"
                        >
                          Expected Delivery Date{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          name="expectedDeliveryDate"
                          onChange={handleDateChange}
                          className="form-control"
                          value={expectedDeliveryDate}
                          required
                        />
                      </div>
                    </div>
                    <div className="text-end">
                      <Button variant="success" onClick={handleSubmit}>
                        Request Quote
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={onClose}
                        className="ms-2"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddressModal;
