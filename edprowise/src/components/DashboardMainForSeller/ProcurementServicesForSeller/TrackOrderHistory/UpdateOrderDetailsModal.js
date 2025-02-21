import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";

import getAPI from "../../../../api/getAPI";
import putAPI from "../../../../api/putAPI";

import { format, parseISO } from "date-fns";

const UpdateOrderDetailsModal = ({
  isOpen,
  onClose,
  orderNumber,
  onOrderDetailsUpdated,
}) => {
  const [orderDetailsFromSeller, setOrderDetailsFromSeller] = useState({
    actualDeliveryDate: "",
    otherCharges: "",
    finalReceivableFromEdprowise: "",
  });

  useEffect(() => {
    if (isOpen) {
      const fetchOrderDetailsFromSeller = async () => {
        try {
          const response = await getAPI(
            `/get-by-order-number?orderNumber=${orderNumber}`
          );
          if (!response.hasError && response.data && response.data.data) {
            const {
              actualDeliveryDate,
              otherCharges,
              finalReceivableFromEdprowise,
            } = response.data.data;

            const formattedDate = format(
              parseISO(actualDeliveryDate),
              "yyyy-MM-dd"
            );

            setOrderDetailsFromSeller({
              otherCharges,
              finalReceivableFromEdprowise,

              actualDeliveryDate: formattedDate,
            });
          } else {
            console.error("Invalid response format or error in response");
          }
        } catch (err) {
          console.error("Error fetching Order Details from Seller:", err);
        }
      };

      fetchOrderDetailsFromSeller();
    }
  }, [isOpen, orderNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetailsFromSeller((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { actualDeliveryDate, otherCharges, finalReceivableFromEdprowise } =
      orderDetailsFromSeller;

    const dataToSend = {
      actualDeliveryDate,
      otherCharges,
      finalReceivableFromEdprowise,
    };

    try {
      const response = await putAPI(
        `/order-details?orderNumber=${orderNumber}&sellerId`,
        dataToSend,
        true
      );

      if (!response.hasError) {
        toast.success("Quote Updated successfully");
        setOrderDetailsFromSeller({
          actualDeliveryDate,
          otherCharges,
          finalReceivableFromEdprowise,
        });
        onOrderDetailsUpdated();
        onClose();
      } else {
        toast.error(response.message || "Failed to update Order Details");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Body className="modal-body-scrollable">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body custom-heading-padding">
                  <div className="container">
                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Update Order Details
                      </h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label
                        htmlFor="actualDeliveryDate"
                        className="form-label"
                      >
                        Actual Delivery Date
                      </label>
                      <input
                        type="date"
                        name="actualDeliveryDate"
                        value={orderDetailsFromSeller.actualDeliveryDate}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="otherCharges" className="form-label">
                        Other Charges
                      </label>
                      <input
                        type="number"
                        name="otherCharges"
                        value={orderDetailsFromSeller.otherCharges}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="finalReceivableFromEdprowise"
                        className="form-label"
                      >
                        Final Receivable From Edprowise
                      </label>
                      <input
                        type="number"
                        name="finalReceivableFromEdprowise"
                        value={
                          orderDetailsFromSeller.finalReceivableFromEdprowise
                        }
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="text-end">
                      <Button variant="success" type="submit">
                        Update
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={onClose}
                        className="ms-2"
                      >
                        Close
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateOrderDetailsModal;
