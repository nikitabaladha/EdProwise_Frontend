// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
// import postAPI from "../../../../../api/postAPI";
// import getAPI from "../../../../../api/getAPI";
// import { toast } from "react-toastify";

// const PaymentModal = ({ show, onClose, studentId, onPaymentSuccess, schoolId, classId, academicYear, firstName, lastName, className }) => {
//   const [formData, setFormData] = useState({
//     academicYear:  academicYear,
//     feeTypeId: "",
//     registrationFee: "",
//     concessionType: "",
//     concessionAmount: "",
//     finalAmount: "",
//     paymentMode: "",
//     chequeNumber: "",
//     bankName: "",
//     name: `${firstName} ${lastName}`.trim() || "", 
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [availableFeeTypes, setAvailableFeeTypes] = useState([]);

//   const styles = {
//     modalBody: {
//       maxHeight: "70vh",
//       overflowY: "auto",
//       overflowX: "hidden",
//       padding: "1rem",
//     },
//     modalDialogMobile: {
//       margin: "0.5rem",
//       maxWidth: "95%",
//     },
//     infoSection: {
//       backgroundColor: "#f8f9fa",
//       padding: "10px",
//       borderRadius: "5px",
//       marginBottom: "15px",
//     },
//     infoLabel: {
//       fontWeight: "bold",
//       marginRight: "5px",
//       color:"black"
//     },
//     infoText: {
//       color:"black"
//     },
//   };

//   const fetchClassRelatedFeeTypes = async () => {
//     try {
//       if (!schoolId || !classId || !academicYear) {
//         toast.error("Missing school ID, class ID, or academic year.");
//         return;
//       }
//       const response = await getAPI(
//         `/get-one-time-feesbyIds/${schoolId}/${classId}/${academicYear}`,
//         {},
//         true
//       );
//       if (response?.data?.data) {
//         const feeTypes = response.data.data.flatMap((feeItem) =>
//           feeItem.oneTimeFees.map((fee) => ({
//             id: fee.feesTypeId._id,
//             name: fee.feesTypeId.feesTypeName,
//             amount: fee.amount || 0,
//           }))
//         );
//         setAvailableFeeTypes(feeTypes);
//       } else {
//         toast.error("No fee types found for the selected class.");
//       }
//     } catch (error) {
//       toast.error("Error fetching fee types");
//       console.error("Fee type fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     if (show) fetchClassRelatedFeeTypes();
//   }, [show, classId, schoolId, academicYear]);

//   useEffect(() => {
//     const registrationFee = parseFloat(formData.registrationFee) || 0;
//     const concessionAmount = parseFloat(formData.concessionAmount) || 0;
//     setFormData((prev) => ({
//       ...prev,
//       finalAmount:
//         registrationFee - concessionAmount >= 0
//           ? (registrationFee - concessionAmount).toString()
//           : "0",
//     }));
//   }, [formData.registrationFee, formData.concessionAmount]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }

//     if (name === "feeTypeId") {
//       const selectedFeeType = availableFeeTypes.find((fee) => fee.id === value);
//       setFormData((prev) => ({
//         ...prev,
//         registrationFee: selectedFeeType ? selectedFeeType.amount.toString() : "",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.feeTypeId) newErrors.feeTypeId = "Fee type is required.";
//     if (
//       !formData.finalAmount ||
//       isNaN(formData.finalAmount) ||
//       parseFloat(formData.finalAmount) < 0
//     ) {
//       newErrors.finalAmount = "Final amount must be a non-negative number.";
//     }
//     if (!formData.paymentMode) newErrors.paymentMode = "Payment mode is required.";
//     if (!formData.name.trim()) newErrors.name = "Name is required.";
//     if (formData.paymentMode === "Cheque") {
//       if (!formData.bankName.trim()) newErrors.bankName = "Bank name is required.";
//       if (!formData.chequeNumber.trim())
//         newErrors.chequeNumber = "Cheque number is required.";
//     }
//     if (formData.concessionType && formData.concessionType !== "null") {
//       if (
//         !formData.concessionAmount ||
//         isNaN(formData.concessionAmount) ||
//         parseFloat(formData.concessionAmount) < 0
//       ) {
//         newErrors.concessionAmount = "Concession amount must be valid.";
//       }
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     setIsSubmitting(true);
//     try {
//       const response = await postAPI(`/create-registration-payments/${studentId}`, formData);
//       if (!response.hasError) {
//         toast.success("Payment created successfully!");
//         onPaymentSuccess();
//         onClose();
//       } else {
//         toast.error(response.message || "Failed to create payment.");
//       }
//     } catch (err) {
//       toast.error("Error creating payment.");
//       console.error("Payment Creation Error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Modal
//       show={show}
//       onHide={onClose}
//       centered
//       backdrop="static"
//       size="lg"
//       scrollable
//       dialogClassName="payment-modal-dialog"
//     >
//       <style>
//         {`
//           @media (max-width: 576px) {
//             .payment-modal-dialog {
//               margin: 0.5rem !important;
//               max-width: 95% !important;
//             }
//           }
//         `}
//       </style>
//       <Modal.Header closeButton>
//         <Modal.Title>Create Payment</Modal.Title>
//       </Modal.Header>
//       <Modal.Body style={styles.modalBody}>
//         {/* Display Student Information */}
//         <div style={styles.infoSection}>
//           <Row>
//             <Col xs={12} md={6}>
//              <p>
//                 <span style={styles.infoLabel}>Academic Year:</span> 
//                   <span style={styles.infoText}>{academicYear || "N/A"}</span>
//               </p>
//              <p>
//                 <span style={styles.infoLabel}>Class:</span> 
//                   <span style={styles.infoText}>{className || "N/A"}</span>
//               </p>
              
//             </Col>
//             <Col xs={12} md={6}>
//               <p>
//                 <span style={styles.infoLabel}>Student Name:</span> 
//                 <span style={styles.infoText}>{firstName} {lastName}</span>
//               </p>
           
             
//             </Col>
//           </Row>
//         </div>
//         <Form>
//           <Row className="mb-3">
//             <Col xs={12} md={6}>
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 isInvalid={!!errors.name}
//                 onChange={handleChange}
//               />
//               <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
//             </Col>
//             <Col xs={12} md={6}>
//               <Form.Label>Fee Type</Form.Label>
//               <Form.Select
//                 name="feeTypeId"
//                 value={formData.feeTypeId}
//                 isInvalid={!!errors.feeTypeId}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Fee Type</option>
//                 {availableFeeTypes.map((fee) => (
//                   <option key={fee.id} value={fee.id}>
//                     {fee.name} (₹{fee.amount})
//                   </option>
//                 ))}
//               </Form.Select>
//               <Form.Control.Feedback type="invalid">{errors.feeTypeId}</Form.Control.Feedback>
//             </Col>
//           </Row>

//           <Row className="mb-3">
//             <Col xs={12} md={4}>
//               <Form.Label>Registration Fee</Form.Label>
//               <Form.Control type="number" name="registrationFee" value={formData.registrationFee} readOnly />
//             </Col>
//             <Col xs={12} md={4}>
//               <Form.Label>Concession Type</Form.Label>
//               <Form.Select name="concessionType" value={formData.concessionType} onChange={handleChange}>
//                 <option value="">Select</option>
//                 <option value="null">None</option>
//                 <option value="EWS">EWS</option>
//                 <option value="SC">SC</option>
//                 <option value="ST">ST</option>
//                 <option value="OBC">OBC</option>
//                 <option value="Staff Children">Staff Children</option>
//                 <option value="Other">Other</option>
//               </Form.Select>
//             </Col>
//             <Col xs={12} md={4}>
//               <Form.Label>Concession Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="concessionAmount"
//                 value={formData.concessionAmount}
//                 isInvalid={!!errors.concessionAmount}
//                 onChange={handleChange}
//               />
//               <Form.Control.Feedback type="invalid">{errors.concessionAmount}</Form.Control.Feedback>
//             </Col>
//           </Row>

//           <Row className="mb-3">
//             <Col xs={12} md={6}>
//               <Form.Label>Final Amount</Form.Label>
//               <Form.Control type="number" name="finalAmount" value={formData.finalAmount} readOnly />
//             </Col>
//             <Col xs={12} md={6}>
//               <Form.Label>Payment Mode</Form.Label>
//               <Form.Select
//                 name="paymentMode"
//                 value={formData.paymentMode}
//                 isInvalid={!!errors.paymentMode}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="Cash">Cash</option>
//                 <option value="Cheque">Cheque</option>
//                 <option value="Online">Online</option>
//               </Form.Select>
//               <Form.Control.Feedback type="invalid">{errors.paymentMode}</Form.Control.Feedback>
//             </Col>
//           </Row>

//           {formData.paymentMode === "Cheque" && (
//             <Row className="mb-3">
//               <Col xs={12} md={6}>
//                 <Form.Label>Bank Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="bankName"
//                   value={formData.bankName}
//                   isInvalid={!!errors.bankName}
//                   onChange={handleChange}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.bankName}</Form.Control.Feedback>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Label>Cheque Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="chequeNumber"
//                   value={formData.chequeNumber}
//                   isInvalid={!!errors.chequeNumber}
//                   onChange={handleChange}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.chequeNumber}</Form.Control.Feedback>
//               </Col>
//             </Row>
//           )}
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
//           {isSubmitting ? <Spinner size="sm" animation="border" /> : "Submit Payment"}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default PaymentModal;


//Razor pay

import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import postAPI from "../../../../../api/postAPI";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";

const PaymentModal = ({ show, onClose, studentId, onPaymentSuccess, schoolId, classId, academicYear, firstName, lastName, className }) => {
  const [formData, setFormData] = useState({
    academicYear: academicYear,
    feeTypeId: "",
    registrationFee: "",
    concessionType: "",
    concessionAmount: "",
    finalAmount: "",
    paymentMode: "",
    chequeNumber: "",
    bankName: "",
    name: `${firstName} ${lastName}`.trim() || "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableFeeTypes, setAvailableFeeTypes] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const styles = {
    modalBody: {
      maxHeight: "70vh",
      overflowY: "auto",
      overflowX: "hidden",
      padding: "1rem",
    },
    modalDialogMobile: {
      margin: "0.5rem",
      maxWidth: "95%",
    },
    infoSection: {
      backgroundColor: "#f8f9fa",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "15px",
    },
    infoLabel: {
      fontWeight: "bold",
      marginRight: "5px",
      color: "black",
    },
    infoText: {
      color: "black",
    },
  };

  const fetchClassRelatedFeeTypes = async () => {
    try {
      if (!schoolId || !classId || !academicYear) {
        toast.error("Missing school ID, class ID, or academic year.");
        return;
      }
      const response = await getAPI(
        `/get-one-time-feesbyIds/${schoolId}/${classId}/${academicYear}`,
        {},
        true
      );
      if (response?.data?.data) {
        const feeTypes = response.data.data.flatMap((feeItem) =>
          feeItem.oneTimeFees.map((fee) => ({
            id: fee.feesTypeId._id,
            name: fee.feesTypeId.feesTypeName,
            amount: fee.amount || 0,
          }))
        );
        setAvailableFeeTypes(feeTypes);
      } else {
        toast.error("No fee types found for the selected class.");
      }
    } catch (error) {
      toast.error("Error fetching fee types");
      console.error("Fee type fetch error:", error);
    }
  };

  useEffect(() => {
    if (show) fetchClassRelatedFeeTypes();
  }, [show, classId, schoolId, academicYear]);

  useEffect(() => {
    const registrationFee = parseFloat(formData.registrationFee) || 0;
    const concessionAmount = parseFloat(formData.concessionAmount) || 0;
    setFormData((prev) => ({
      ...prev,
      finalAmount:
        registrationFee - concessionAmount >= 0
          ? (registrationFee - concessionAmount).toString()
          : "0",
    }));
  }, [formData.registrationFee, formData.concessionAmount]);

  useEffect(() => {
    setIsFormValid(validateForm()); 
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "feeTypeId") {
      const selectedFeeType = availableFeeTypes.find((fee) => fee.id === value);
      setFormData((prev) => ({
        ...prev,
        registrationFee: selectedFeeType ? selectedFeeType.amount.toString() : "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.feeTypeId) newErrors.feeTypeId = "Fee type is required.";
    if (
      !formData.finalAmount ||
      isNaN(formData.finalAmount) ||
      parseFloat(formData.finalAmount) < 0
    ) {
      newErrors.finalAmount = "Final amount must be a non-negative number.";
    }
    if (!formData.paymentMode) newErrors.paymentMode = "Payment mode is required.";
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (formData.paymentMode === "Cheque") {
      if (!formData.bankName.trim()) newErrors.bankName = "Bank name is required.";
      if (!formData.chequeNumber.trim())
        newErrors.chequeNumber = "Cheque number is required.";
      else if (!/^\d{6}$/.test(formData.chequeNumber))
        newErrors.chequeNumber = "Cheque number must be exactly 6 digits.";
    }
    if (
      formData.concessionAmount &&
      parseFloat(formData.concessionAmount) > 0 &&
      (!formData.concessionType || formData.concessionType === "")
    ) {
      newErrors.concessionType = "Concession type is required when a concession amount is entered.";
    }
    if (formData.concessionType && formData.concessionType !== "null") {
      if (
        !formData.concessionAmount ||
        isNaN(formData.concessionAmount) ||
        parseFloat(formData.concessionAmount) < 0
      ) {
        newErrors.concessionAmount = "Concession amount must be a valid non-negative number.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(true);

    try {
      if (formData.paymentMode === "Online") {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded || !window.Razorpay) {
          toast.error("Failed to load Razorpay SDK. Please try again.");
          console.error("Razorpay SDK not loaded:", window.Razorpay);
          setIsSubmitting(false);
          return;
        }

        console.log("Form data:", formData);
        const response = await postAPI(`/create-registration-payments/${studentId}`, formData);
        console.log("Backend response:", response);
        if (response.hasError) {
          toast.error(response.message || "Failed to create Razorpay order.");
          setIsSubmitting(false);
          return;
        }

        const { orderId, amount, currency, key } = response.data || response;
        const options = {
          key,
          amount,
          currency,
          name: "School Payment",
          description: `Payment for ${formData.name}`,
          order_id: orderId,
          handler: async (response) => {
            try {
              const paymentData = {
                ...formData,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              };
              console.log("Payment verification data:", paymentData);
              const verifyResponse = await postAPI(`/create-registration-payments/${studentId}`, paymentData);
              if (!verifyResponse.hasError) {
                toast.success("Payment verified and created successfully!");
                onPaymentSuccess();
                onClose();
              } else {
                toast.error(verifyResponse.message || "Payment verification failed.");
              }
            } catch (err) {
              toast.error("Error verifying payment.");
              console.error("Payment verification error:", err);
            }
          },
          prefill: {
            name: formData.name,
          },
          theme: {
            color: "#3399cc",
          },
        };

        console.log("Razorpay options:", options);
        try {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (rzpError) {
          toast.error("Failed to initialize Razorpay modal.");
          console.error("Razorpay initialization error:", rzpError);
          setIsSubmitting(false);
          return;
        }
      } else {
        console.log("Form data (non-online):", formData);
        const response = await postAPI(`/create-registration-payments/${studentId}`, formData);
        console.log("Backend response (non-online):", response);
        if (!response.hasError) {
          toast.success("Payment created successfully!");
          onPaymentSuccess();
          onClose();
        } else {
          toast.error(response.message || "Failed to create payment.");
        }
      }
    } catch (err) {
      toast.error("Error creating payment.");
      console.error("Payment Creation Error:", err);
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
      dialogClassName="payment-modal-dialog"
    >
      <style>
        {`
          @media (max-width: 576px) {
            .payment-modal-dialog {
              margin: 0.5rem !important;
              max-width: 95% !important;
            }
          }
        `}
      </style>
      <Modal.Header closeButton>
        <Modal.Title>Create Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.modalBody}>
        <div style={styles.infoSection}>
          <Row>
            <Col xs={12} md={6}>
              <p>
                <span style={styles.infoLabel}>Academic Year:</span>
                <span style={styles.infoText}>{academicYear || "N/A"}</span>
              </p>
              <p>
                <span style={styles.infoLabel}>Class:</span>
                <span style={styles.infoText}>{className || "N/A"}</span>
              </p>
            </Col>
            <Col xs={12} md={6}>
              <p>
                <span style={styles.infoLabel}>Student Name:</span>
                <span style={styles.infoText}>{firstName} {lastName}</span>
              </p>
            </Col>
          </Row>
        </div>
        <Form>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                isInvalid={!!errors.name}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>Fee Type</Form.Label>
              <Form.Select
                name="feeTypeId"
                value={formData.feeTypeId}
                isInvalid={!!errors.feeTypeId}
                onChange={handleChange}
              >
                <option value="">Select Fee Type</option>
                {availableFeeTypes.map((fee) => (
                  <option key={fee.id} value={fee.id}>
                    {fee.name} (₹{fee.amount})
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.feeTypeId}</Form.Control.Feedback>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} md={4}>
              <Form.Label>Registration Fee</Form.Label>
              <Form.Control type="number" name="registrationFee" value={formData.registrationFee} readOnly />
            </Col>
            <Col xs={12} md={4}>
              <Form.Label>Concession Type</Form.Label>
              <Form.Select
                name="concessionType"
                value={formData.concessionType}
                isInvalid={!!errors.concessionType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="null">None</option>
                <option value="EWS">EWS</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
                <option value="Staff Children">Staff Children</option>
                <option value="Other">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.concessionType}</Form.Control.Feedback>
            </Col>
            <Col xs={12} md={4}>
              <Form.Label>Concession Amount</Form.Label>
              <Form.Control
                type="number"
                name="concessionAmount"
                value={formData.concessionAmount}
                isInvalid={!!errors.concessionAmount}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">{errors.concessionAmount}</Form.Control.Feedback>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Label>Final Amount</Form.Label>
              <Form.Control type="number" name="finalAmount" value={formData.finalAmount} readOnly />
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>Payment Mode</Form.Label>
              <Form.Select
                name="paymentMode"
                value={formData.paymentMode}
                isInvalid={!!errors.paymentMode}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="Online">Online</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.paymentMode}</Form.Control.Feedback>
            </Col>
          </Row>

          {formData.paymentMode === "Cheque" && (
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  isInvalid={!!errors.bankName}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">{errors.bankName}</Form.Control.Feedback>
              </Col>
              <Col xs={12} md={6}>
                <Form.Label>Cheque Number</Form.Label>
                <Form.Control
                  type="text"
                  name="chequeNumber"
                  value={formData.chequeNumber}
                  isInvalid={!!errors.chequeNumber}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">{errors.chequeNumber}</Form.Control.Feedback>
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? <Spinner size="sm" animation="border" /> : "Submit Payment"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;

//------------------------------------------EaseBuzzz---------------------------------------------//
