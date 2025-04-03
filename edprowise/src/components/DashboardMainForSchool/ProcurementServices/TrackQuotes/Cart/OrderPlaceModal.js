import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";
import CityData from "../../../../CityData.json";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
const OrderPlaceModal = ({
  onClose,
  enquiryNumber,
  carts,
  fetchCartData,
  latestDeliveryDate,
}) => {
  // if no latestDeiveryDate or no carts fount then show <div>No cart data found</div>  to avoid run time error
  const navigate = useNavigate();
  const [quoteRequest, setQuoteRequest] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(
    latestDeliveryDate ? latestDeliveryDate.split("T")[0] : ""
  );

  const fetchQuoteRequestData = async () => {
    try {
      const response = await getAPI(
        `/get-quote-request/${enquiryNumber}`,
        {},
        true
      );

      if (!response.hasError && response.data && response.data.data) {
        setQuoteRequest(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Quote Request:", err);
    }
  };

  useEffect(() => {
    if (enquiryNumber) {
      fetchQuoteRequestData();
    }
  }, [enquiryNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuoteRequest((prevQuoteRequest) => ({
      ...prevQuoteRequest,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    setDeliveryDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !quoteRequest?.deliveryAddress ||
      !quoteRequest?.deliveryLocation ||
      !quoteRequest?.deliveryLandMark ||
      !quoteRequest?.deliveryPincode ||
      !deliveryDate
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const products = Object.values(carts)
      .flat()
      .map((cartItem) => ({
        cartId: cartItem._id,
      }));

    const formDataToSend = {
      enquiryNumber,
      products,
      deliveryAddress: quoteRequest.deliveryAddress,
      deliveryLocation: quoteRequest.deliveryLocation,
      deliveryLandMark: quoteRequest.deliveryLandMark,
      deliveryPincode: quoteRequest.deliveryPincode,
      expectedDeliveryDate: deliveryDate,
    };

    try {
      const response = await postAPI("/order-from-buyer", formDataToSend, true);

      if (!response.hasError) {
        toast.success("Order Placed successfully");
        onClose();
        await fetchCartData();
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to place order");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => ({
      value: `${city}, ${state}, India`,
      label: `${city}, ${state}, India`,
    }))
  );

  if (!carts || Object.keys(carts).length === 0 || !latestDeliveryDate) {
    return <></>;
  }

  return (
    <Modal show={true} onHide={onClose} centered dialogClassName="custom-modal">
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body custom-heading-padding">
                  <div className="container">
                    <div className="card-header">
                      <h4 className="card-title text-center custom-heading-font">
                        Your Current Address Details
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="deliveryAddress" className="form-label">
                          Delivery Address{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="deliveryAddress"
                          value={quoteRequest?.deliveryAddress || ""}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label
                          htmlFor="deliveryLocation"
                          className="form-label"
                        >
                          Delivery Location{" "}
                          <span className="text-danger">*</span>
                        </label>

                        <Select
                          id="cityStateCountry"
                          name="schoolLocation"
                          options={cityOptions}
                          value={cityOptions.find(
                            (option) =>
                              option.value === quoteRequest?.deliveryLocation
                          )}
                          onChange={(selectedOption) =>
                            setQuoteRequest((prevState) => ({
                              ...prevState,
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
                          value={quoteRequest?.deliveryLandMark || ""}
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
                          value={quoteRequest?.deliveryPincode || ""}
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
                          value={deliveryDate}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                    </div>
                    <div className="text-end">
                      <Button variant="success" onClick={handleSubmit}>
                        Place Order
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

export default OrderPlaceModal;
