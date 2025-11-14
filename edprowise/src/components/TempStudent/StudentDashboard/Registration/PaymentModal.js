import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
import postAPI from "../../../../api/postAPI";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";

const PaymentModal = ({
  show,
  onClose,
  studentId,
  onPaymentSuccess,
  schoolId,
  classId,
  academicYear,
  firstName,
  lastName,
  className
}) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};

  const [formData, setFormData] = useState({
    academicYear,
    registrationFee: "",
    concessionAmount: "0",
    finalAmount: "",
    name: `${firstName} ${lastName}`.trim() || "",
    email: userDetails?.email || "",
    phone: userDetails?.phone || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingFee, setLoadingFee] = useState(false);

  const styles = {
    modalBody: {
      maxHeight: "70vh",
      overflowY: "auto",
      padding: "1rem",
    },
    infoSection: {
      backgroundColor: "#f8f9fa",
      padding: "15px",
      color: "Black",
      borderRadius: "8px",
      marginBottom: "20px",
      border: "1px solid #e9ecef",
    },
  };


  const fetchRegistrationFee = async () => {
    setLoadingFee(true);
    try {
      if (!schoolId || !classId || !academicYear) {
        toast.error("Missing required parameters.");
        return;
      }

      const response = await getAPI(
        `/get-one-time-feesbyIds/${schoolId}/${classId}/${academicYear}`,
        {},
        true
      );

      const feeData = response?.data?.data ?? [];
      if (feeData.length === 0) {
        toast.warning("No fee data found for the selected class.");
        return;
      }

      const registrationFeeItem = feeData
        .flatMap((feeItem) => feeItem.oneTimeFees)
        .find(
          (fee) =>
            fee?.feesTypeId?.feesTypeName?.toLowerCase() ===
            "registration fee"
        );

      if (registrationFeeItem) {
        setFormData((prev) => ({
          ...prev,
          registrationFee: registrationFeeItem.amount.toString(),
          finalAmount: registrationFeeItem.amount.toString(),
        }));
      } else {
        toast.warning("Registration Fee not found for the selected class.");
      }
    } catch (error) {
      toast.error("Error fetching registration fee");
      console.error("Fee fetch error:", error);
    } finally {
      setLoadingFee(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchRegistrationFee();
      setFormData((prev) => ({
        ...prev,
        academicYear,
        name: `${firstName} ${lastName}`.trim() || "",
        email: userDetails?.email || "",
        phone: userDetails?.phone || "",
      }));
    }
  }, [show, academicYear, firstName, lastName]);

  const handleSubmit = async () => {
    if (!formData.registrationFee || parseFloat(formData.registrationFee) <= 0) {
      toast.error("Invalid registration fee amount.");
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        feeType: "Registration Fee",
        paymentMode: "Online",
        schoolId,
      };

      const response = await postAPI(
        `/create-registration-payments/${studentId}`,
        submitData
      );

      const apiResponse = response.data || response;

      if (apiResponse.hasError) {
        toast.error(apiResponse.message || "Payment initialization failed.");
        return;
      }

      const paymentUrl = apiResponse.paymentUrl;
      if (paymentUrl) {
        toast.info("Redirecting to secure payment gateway...");
        window.location.href = paymentUrl;
      } else {
        toast.success("Payment recorded successfully!");
        onPaymentSuccess?.();
        onClose();
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while processing payment.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      size="lg"
      scrollable
      onExited={() => {
        setFormData({
          academicYear,
          registrationFee: "",
          concessionAmount: "0",
          finalAmount: "",
          name: `${firstName} ${lastName}`.trim() || "",
          email: userDetails?.email || "",
          phone: userDetails?.phone || "",
        });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Process Registration Payment</Modal.Title>
      </Modal.Header>

      <Modal.Body style={styles.modalBody}>
        <div style={styles.infoSection}>
          <Row className="mb-2">
            <Col md={4}>
              <strong>Student:</strong>
            </Col>
            <Col md={8}>{formData.name}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>
              <strong>Academic Year:</strong>
            </Col>
            <Col md={8}>{academicYear}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>
              <strong>Class:</strong>
            </Col>
            <Col md={8}>{className}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>
              <strong>Email:</strong>
            </Col>
            <Col md={8}>{formData.email || "N/A"}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>
              <strong>Phone:</strong>
            </Col>
            <Col md={8}>{formData.phone || "N/A"}</Col>
          </Row>
        </div>

        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label className="fw-bold">Registration Fee</Form.Label>
              <Form.Control
                type="number"
                name="registrationFee"
                value={formData.registrationFee}
                readOnly
                disabled
              />
            </Col>
            <Col md={6}>
              <Form.Label className="fw-bold">Final Amount</Form.Label>
              <Form.Control
                type="number"
                name="finalAmount"
                value={formData.finalAmount}
                readOnly
                disabled
              />
            </Col>
          </Row>
        </Form>

        { }
        <Alert variant="warning" className="mt-3">
          ⚠️ <strong>Note:</strong> Please confirm your payment. Once the payment is successfully
          completed, <strong>you will not be able to edit the registration form.</strong>
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting || loadingFee}
        >
          {isSubmitting ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Processing...
            </>
          ) : (
            "Confirm & Pay"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
