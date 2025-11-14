// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
// import postAPI from "../../../../../api/postAPI";
// import getAPI from "../../../../../api/getAPI";
// import { toast } from "react-toastify";

// const PaymentModal = ({
//   show,
//   onClose,
//   studentId,
//   onPaymentSuccess,
//   schoolId,
//   classId,
//   academicYear,
//   firstName,
//   lastName,
//   className,
//   parentContactNumber
// }) => {
//   const [formData, setFormData] = useState({
//     academicYear: academicYear,
//     feeTypeId: "",
//     registrationFee: "",
//     concessionType: "",
//     concessionAmount: "",
//     finalAmount: "",
//     paymentMode: "",
//     chequeNumber: "",
//     bankName: "",
//     name: `${firstName} ${lastName}`.trim() || "",
//     email: "",
//     phone: parentContactNumber || "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [availableFeeTypes, setAvailableFeeTypes] = useState([]);
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [loadingFeeTypes, setLoadingFeeTypes] = useState(false);

//   const styles = {
//     modalBody: {
//       maxHeight: "70vh",
//       overflowY: "auto",
//       overflowX: "hidden",
//       padding: "1rem",
//     },
//     infoSection: {
//       backgroundColor: "#f8f9fa",
//       padding: "15px",
//       color: "Black",
//       borderRadius: "8px",
//       marginBottom: "20px",
//       border: "1px solid #e9ecef",
//     },
//   };

//   const fetchClassRelatedFeeTypes = async () => {
//     setLoadingFeeTypes(true);
//     try {
//       if (!schoolId || !classId || !academicYear) {
//         toast.error("Missing required parameters.");
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
//         toast.warning("No fee types found for the selected class.");
//       }
//     } catch (error) {
//       toast.error("Error fetching fee types");
//       console.error("Fee type fetch error:", error);
//     } finally {
//       setLoadingFeeTypes(false);
//     }
//   };

//   useEffect(() => {
//     if (show) {
//       fetchClassRelatedFeeTypes();
//       setFormData(prev => ({
//         ...prev,
//         academicYear,
//         name: `${firstName} ${lastName}`.trim() || "",
//         email: "",
//         phone: parentContactNumber || "",
//       }));
//     }
//   }, [show, academicYear, firstName, lastName, parentContactNumber]);

//   useEffect(() => {
//     const registrationFee = parseFloat(formData.registrationFee) || 0;
//     const concessionAmount = parseFloat(formData.concessionAmount) || 0;
//     const finalAmt = Math.max(0, registrationFee - concessionAmount);

//     setFormData(prev => ({
//       ...prev,
//       finalAmount: finalAmt.toString(),
//     }));
//   }, [formData.registrationFee, formData.concessionAmount]);

//   useEffect(() => {
//     setIsFormValid(validateForm());
//   }, [formData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }

//     if (name === "feeTypeId" && value) {
//       const selectedFeeType = availableFeeTypes.find(fee => fee.id === value);
//       if (selectedFeeType) {
//         setFormData(prev => ({
//           ...prev,
//           registrationFee: selectedFeeType.amount.toString(),
//           finalAmount: selectedFeeType.amount.toString(),
//         }));
//       }
//     }
//   };

//  const validateForm = () => {
//   const newErrors = {};

//   if (!formData.feeTypeId) newErrors.feeTypeId = "Please select a fee type.";
//   if (!formData.registrationFee || parseFloat(formData.registrationFee) <= 0) {
//     newErrors.registrationFee = "Valid registration fee is required.";
//   }
//   if (parseFloat(formData.finalAmount) <= 0) {
//     newErrors.finalAmount = "Final amount must be greater than zero.";
//   }
//   if (!formData.paymentMode) newErrors.paymentMode = "Please select payment mode.";
//   if (!formData.name.trim()) newErrors.name = "Name is required.";

//   // === ONLINE PAYMENT VALIDATION ===
//   if (formData.paymentMode === "Online") {
//     if (!formData.email?.trim()) {
//       newErrors.email = "Email is required for online payment.";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address.";
//     }

//     if (!formData.phone?.trim()) {
//       newErrors.phone = "Phone number is required for online payment.";
//     } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
//       newErrors.phone = "Phone number must be exactly 10 digits.";
//     }
//   }

//   // === CHEQUE VALIDATION ===
//   if (formData.paymentMode === "Cheque") {
//     if (!formData.bankName?.trim()) newErrors.bankName = "Bank name is required.";
//     if (!formData.chequeNumber?.trim()) {
//       newErrors.chequeNumber = "Cheque number is required.";
//     } else if (!/^\d{6}$/.test(formData.chequeNumber)) {
//       newErrors.chequeNumber = "Cheque number must be exactly 6 digits.";
//     }
//   }

//   // === CONCESSION VALIDATION ===
//   if (formData.concessionType && formData.concessionType !== "null" && formData.concessionType !== "") {
//     if (!formData.concessionAmount || parseFloat(formData.concessionAmount) <= 0) {
//       newErrors.concessionAmount = "Valid concession amount is required.";
//     }
//     if (parseFloat(formData.concessionAmount) > parseFloat(formData.registrationFee || 0)) {
//       newErrors.concessionAmount = "Concession cannot exceed registration fee.";
//     }
//   }

//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
// };

//   const initiateEasebuzzPayment = (paymentUrl) => {
//     sessionStorage.setItem('easebuzzPayment', JSON.stringify({
//       studentId,
//       paymentUrl,
//       timestamp: Date.now()
//     }));

//     window.location.href = paymentUrl;
//   };

//   const handleSubmit = async () => {
//     if (!isFormValid) {
//       toast.error("Please fix the errors in the form.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const submitData = {
//         ...formData,
//         schoolId,
//       };

//       const response = await postAPI(`/create-registration-payments/${studentId}`, submitData);

//       const apiResponse = response.data || response;

//       if (apiResponse.hasError) {
//         toast.error(apiResponse.message || "Payment initialization failed.");
//         return;
//       }

//       if (formData.paymentMode === "Online") {
//         const paymentUrl = apiResponse.paymentUrl;
//         if (paymentUrl) {
//           toast.info("Redirecting to secure payment gateway...");
//           initiateEasebuzzPayment(paymentUrl);
//         } else {
//           toast.error("Payment URL not received from gateway.");
//         }
//       } else {
//         toast.success("Payment recorded successfully!");
//         onPaymentSuccess?.();
//         onClose();
//       }
//     }catch (error) {
//   const errorMessage =
//     error?.response?.data?.message ||
//     error?.message ||
//     "An error occurred while processing payment.";

//   toast.error(errorMessage);

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
//       onExited={() => {
//         setFormData({
//           academicYear,
//           feeTypeId: "",
//           registrationFee: "",
//           concessionType: "",
//           concessionAmount: "",
//           finalAmount: "",
//           paymentMode: "",
//           chequeNumber: "",
//           bankName: "",
//           name: `${firstName} ${lastName}`.trim() || "",
//           email: "",
//           phone: parentContactNumber || "",
//         });
//         setErrors({});
//       }}
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Process Registration Payment</Modal.Title>
//       </Modal.Header>

//       <Modal.Body style={styles.modalBody}>
//         <div style={styles.infoSection}>
//           <Row className="mb-2 align-items-center">
//             <Col md={3} sm={4} xs={5}>
//               <strong>Student :</strong>
//             </Col>
//             <Col md={9} sm={8} xs={7}>
//               {firstName} {lastName}
//             </Col>
//           </Row>

//           <Row className="mb-2 align-items-center">
//             <Col md={3} sm={4} xs={5}>
//               <strong>Academic Year :</strong>
//             </Col>
//             <Col md={9} sm={8} xs={7}>
//               {academicYear}
//             </Col>
//           </Row>

//           <Row className="mb-2 align-items-center">
//             <Col md={3} sm={4} xs={5}>
//               <strong>Class :</strong>
//             </Col>
//             <Col md={9} sm={8} xs={7}>
//               {className}
//             </Col>
//           </Row>
//         </div>

//         <Form>
//           <Row className="mb-3">
//             <Col md={12}>
//               <Form.Label className="fw-bold">Fee Type <span style={{ color: "red" }}>*</span></Form.Label>
//               {loadingFeeTypes ? (
//                 <Spinner animation="border" size="sm" />
//               ) : (
//                 <Form.Select
//                   name="feeTypeId"
//                   value={formData.feeTypeId}
//                   isInvalid={!!errors.feeTypeId}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Fee Type</option>
//                   {availableFeeTypes.map((fee) => (
//                     <option key={fee.id} value={fee.id}>
//                       {fee.name} - ₹{parseFloat(fee.amount).toLocaleString()}
//                     </option>
//                   ))}
//                 </Form.Select>
//               )}
//               <Form.Control.Feedback type="invalid">{errors.feeTypeId}</Form.Control.Feedback>
//             </Col>
//           </Row>

//           <Row className="mb-3">
//             <Col md={4}>
//               <Form.Label>Registration Fee</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="registrationFee"
//                 value={formData.registrationFee}
//                 className={errors.registrationFee ? "is-invalid" : ""}
//                 readOnly
//               />
//             </Col>
//             <Col md={4}>
//               <Form.Label>Concession Type</Form.Label>
//               <Form.Select
//                 name="concessionType"
//                 value={formData.concessionType}
//                 isInvalid={!!errors.concessionType}
//                 onChange={handleChange}
//               >
//                 <option value="">None</option>
//                 <option value="EWS">EWS</option>
//                 <option value="SC">SC</option>
//                 <option value="ST">ST</option>
//                 <option value="OBC">OBC</option>
//                 <option value="Staff Children">Staff Children</option>
//                 <option value="Other">Other</option>
//               </Form.Select>
//             </Col>
//             <Col md={4}>
//               <Form.Label>Concession Amount</Form.Label>
//               <Form.Control
//                 name="concessionAmount"
//                 value={formData.concessionAmount}
//                 isInvalid={!!errors.concessionAmount}
//                 onChange={handleChange}
//                 min="0"
//               />
//               <Form.Control.Feedback type="invalid">{errors.concessionAmount}</Form.Control.Feedback>
//             </Col>
//           </Row>

//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Label className="fw-bold">Final Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="finalAmount"
//                 value={formData.finalAmount}
//                 className={errors.finalAmount ? "is-invalid" : ""}
//                 readOnly
//               />
//               <Form.Control.Feedback type="invalid">{errors.finalAmount}</Form.Control.Feedback>
//             </Col>
//             <Col md={6}>
//               <Form.Label className="fw-bold">
//                 Payment Mode <span style={{ color: "red" }}>*</span>
//               </Form.Label>

//               <Form.Select
//                 name="paymentMode"
//                 value={formData.paymentMode}
//                 isInvalid={!!errors.paymentMode}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Mode</option>
//                 <option value="Cash">Cash</option>
//                 <option value="Cheque">Cheque</option>
//                 <option value="Online">Online</option>
//               </Form.Select>
//               <Form.Control.Feedback type="invalid">{errors.paymentMode}</Form.Control.Feedback>
//             </Col>
//           </Row>

//           {formData.paymentMode === "Online" && (
//             <>
//               <Row className="mb-3">
//                 <Col md={6}>
//                   <Form.Label>Email <span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     isInvalid={!!errors.email}
//                     placeholder="student@example.com"
//                     onChange={handleChange}
//                   />
//                   <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Label>Phone (Parent Contact)<span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     isInvalid={!!errors.phone}
//                     placeholder="1234567890"
//                     onChange={handleChange}
//                   />
//                   <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
//                 </Col>
//               </Row>
//               {errors.emailPhone && (
//                 <Alert variant="warning" className="mb-3">
//                   {errors.emailPhone}
//                 </Alert>
//               )}
//               <Alert variant="info">
//                 <strong>Secure Online Payment:</strong> You will be redirected to our secure payment gateway
//                 to complete your transaction safely using Credit/Debit Card, Net Banking, or UPI.
//                 <br />
//               </Alert>
//             </>
//           )}

//           {formData.paymentMode === "Cheque" && (
//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Label>Bank Name *</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="bankName"
//                   value={formData.bankName}
//                   isInvalid={!!errors.bankName}
//                   onChange={handleChange}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.bankName}</Form.Control.Feedback>
//               </Col>
//               <Col md={6}>
//                 <Form.Label>Cheque Number *</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="chequeNumber"
//                   value={formData.chequeNumber}
//                   isInvalid={!!errors.chequeNumber}
//                   onChange={handleChange}
//                   maxLength={6}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.chequeNumber}</Form.Control.Feedback>
//               </Col>
//             </Row>
//           )}
//         </Form>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button
//           variant="secondary"
//           onClick={onClose}
//           disabled={isSubmitting}
//         >
//           Cancel
//         </Button>
//         <Button
//           variant="primary"
//           onClick={handleSubmit}
//           disabled={isSubmitting || !isFormValid || loadingFeeTypes}
//         >
//           {isSubmitting ? (
//             <>
//               <Spinner size="sm" animation="border" className="me-2" />
//               Processing...
//             </>
//           ) : (
//             "Process Payment"
//           )}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default PaymentModal;


import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import postAPI from "../../../../../api/postAPI";
import getAPI from "../../../../../api/getAPI";
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
  className,
  parentContactNumber,
}) => {
  const [formData, setFormData] = useState({
    academicYear,
    feeTypeId: "",
    registrationFee: "",
    concessionType: "",
    concessionAmount: "",
    finalAmount: "",
    paymentMode: "",
    chequeNumber: "",
    bankName: "",
    name: `${firstName} ${lastName}`.trim() || "",
    email: "",
    phone: parentContactNumber || "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableFeeTypes, setAvailableFeeTypes] = useState([]);
  const [loadingFeeTypes, setLoadingFeeTypes] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const styles = {
    modalBody: { maxHeight: "70vh", overflowY: "auto", padding: "1rem" },
    infoSection: {
      backgroundColor: "#f8f9fa",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "20px",
      border: "1px solid #e9ecef",
    },
  };

  // Fetch fee types when modal opens
  const fetchClassRelatedFeeTypes = async () => {
    setLoadingFeeTypes(true);
    try {
      if (!schoolId || !classId || !academicYear) return;
      const res = await getAPI(
        `/get-one-time-feesbyIds/${schoolId}/${classId}/${academicYear}`,
        {},
        true
      );
      if (res?.data?.data) {
        const fees = res.data.data.flatMap((item) =>
          item.oneTimeFees.map((f) => ({
            id: f.feesTypeId._id,
            name: f.feesTypeId.feesTypeName,
            amount: f.amount || 0,
          }))
        );
        setAvailableFeeTypes(fees);
      } else {
        toast.warning("No fee types found for this class.");
      }
    } catch (e) {
      toast.error("Failed to load fee types.");
      console.error(e);
    } finally {
      setLoadingFeeTypes(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchClassRelatedFeeTypes();
      setFormData((prev) => ({
        ...prev,
        academicYear,
        name: `${firstName} ${lastName}`.trim() || "",
        email: "",
        phone: parentContactNumber || "",
      }));
    }
  }, [show, academicYear, firstName, lastName, parentContactNumber]);

  // Auto-calculate final amount
  useEffect(() => {
    const reg = parseFloat(formData.registrationFee) || 0;
    const con = parseFloat(formData.concessionAmount) || 0;
    const final = Math.max(0, reg - con);
    setFormData((prev) => ({ ...prev, finalAmount: final.toString() }));
  }, [formData.registrationFee, formData.concessionAmount]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.feeTypeId) newErrors.feeTypeId = "Please select a fee type.";
    if (!formData.registrationFee || parseFloat(formData.registrationFee) <= 0)
      newErrors.registrationFee = "Valid registration fee is required.";
    if (parseFloat(formData.finalAmount) <= 0)
      newErrors.finalAmount = "Final amount must be greater than zero.";
    if (!formData.paymentMode) newErrors.paymentMode = "Please select payment mode.";
    if (!formData.name.trim()) newErrors.name = "Name is required.";

    // Online validation
    if (formData.paymentMode === "Online") {
      if (!formData.email?.trim()) {
        newErrors.email = "Email is required for online payment.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }

      if (!formData.phone?.trim()) {
        newErrors.phone = "Phone number is required.";
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Phone must be exactly 10 digits.";
      }
    }

    // Cheque validation
    if (formData.paymentMode === "Cheque") {
      if (!formData.bankName?.trim()) newErrors.bankName = "Bank name is required.";
      if (!formData.chequeNumber?.trim()) newErrors.chequeNumber = "Cheque number is required.";
      else if (!/^\d{6}$/.test(formData.chequeNumber))
        newErrors.chequeNumber = "Cheque number must be exactly 6 digits.";
    }

    // Concession validation
    if (formData.concessionType && formData.concessionAmount) {
      const conAmt = parseFloat(formData.concessionAmount);
      const regAmt = parseFloat(formData.registrationFee || 0);
      if (conAmt > regAmt)
        newErrors.concessionAmount = "Concession cannot exceed registration fee.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Auto-fill fee amount when fee type selected
    if (name === "feeTypeId" && value) {
      const selected = availableFeeTypes.find((f) => f.id === value);
      if (selected) {
        setFormData((prev) => ({
          ...prev,
          registrationFee: selected.amount.toString(),
          finalAmount: selected.amount.toString(),
        }));
      }
    }
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = { ...formData, schoolId };
      const response = await postAPI(
        `/create-registration-payments-link/${studentId}`,
        payload
      );
      const result = response.data || response;

      if (result.hasError) {
        toast.error(result.message || "Payment processing failed.");
        return;
      }

      if (formData.paymentMode === "Online") {
        toast.success("Payment link has been sent to your email!");
      } else {
        toast.success("Payment recorded successfully!");
      }

      onPaymentSuccess?.();
      onClose();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Network error. Please try again.";
      toast.error(msg);
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
          feeTypeId: "",
          registrationFee: "",
          concessionType: "",
          concessionAmount: "",
          finalAmount: "",
          paymentMode: "",
          chequeNumber: "",
          bankName: "",
          name: `${firstName} ${lastName}`.trim() || "",
          email: "",
          phone: parentContactNumber || "",
        });
        setErrors({});
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Process Registration Payment</Modal.Title>
      </Modal.Header>

      <Modal.Body style={styles.modalBody}>
        {/* Student Info */}
        <div style={styles.infoSection}>
          <Row className="mb-2">
            <Col md={3}><strong>Student:</strong></Col>
            <Col>{firstName} {lastName}</Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}><strong>Academic Year:</strong></Col>
            <Col>{academicYear}</Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}><strong>Class:</strong></Col>
            <Col>{className}</Col>
          </Row>
        </div>

        <Form>
          {/* Fee Type */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Label className="fw-bold">
                Fee Type <span className="text-danger">*</span>
              </Form.Label>
              {loadingFeeTypes ? (
                <div className="text-center">
                  <Spinner animation="border" size="sm" /> Loading fees...
                </div>
              ) : (
                <Form.Select
                  name="feeTypeId"
                  value={formData.feeTypeId}
                  isInvalid={!!errors.feeTypeId}
                  onChange={handleChange}
                >
                  <option value="">Select Fee Type</option>
                  {availableFeeTypes.map((fee) => (
                    <option key={fee.id} value={fee.id}>
                      {fee.name} - ₹{parseFloat(fee.amount).toLocaleString()}
                    </option>
                  ))}
                </Form.Select>
              )}
              <Form.Control.Feedback type="invalid">
                {errors.feeTypeId}
              </Form.Control.Feedback>
            </Col>
          </Row>

          {/* Registration Fee & Concession */}
          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Registration Fee</Form.Label>
              <Form.Control
                type="number"
                name="registrationFee"
                value={formData.registrationFee}
                readOnly
                className={errors.registrationFee ? "is-invalid" : ""}
              />
            </Col>
            <Col md={4}>
              <Form.Label>Concession Type</Form.Label>
              <Form.Select
                name="concessionType"
                value={formData.concessionType}
                onChange={handleChange}
              >
                <option value="">None</option>
                {[
                  "EWS",
                  "SC",
                  "ST",
                  "OBC",
                  "Staff Children",
                  "Other",
                ].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Label>Concession Amount</Form.Label>
              <Form.Control
                type="number"
                name="concessionAmount"
                value={formData.concessionAmount}
                isInvalid={!!errors.concessionAmount}
                onChange={handleChange}
                min="0"
              />
              <Form.Control.Feedback type="invalid">
                {errors.concessionAmount}
              </Form.Control.Feedback>
            </Col>
          </Row>

          {/* Final Amount & Payment Mode */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label className="fw-bold">Final Amount</Form.Label>
              <Form.Control
                type="number"
                name="finalAmount"
                value={formData.finalAmount}
                readOnly
                className={errors.finalAmount ? "is-invalid" : ""}
              />
              <Form.Control.Feedback type="invalid">
                {errors.finalAmount}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label className="fw-bold">
                Payment Mode <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="paymentMode"
                value={formData.paymentMode}
                isInvalid={!!errors.paymentMode}
                onChange={handleChange}
              >
                <option value="">Select Mode</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="Online">Online</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.paymentMode}
              </Form.Control.Feedback>
            </Col>
          </Row>

          {/* Online Fields */}
          {formData.paymentMode === "Online" && (
            <>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>
                    Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    isInvalid={!!errors.email}
                    placeholder="parent@example.com"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Col>
                <Col md={6}>
                  <Form.Label>
                    Phone <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    isInvalid={!!errors.phone}
                    placeholder="9876543210"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <Alert variant="info" className="mb-3">
                <strong>Secure Payment:</strong> A payment link will be sent to the email you provided. You can pay using UPI, Card, or Net Banking.
              </Alert>
            </>
          )}

          {/* Cheque Fields */}
          {formData.paymentMode === "Cheque" && (
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>
                  Bank Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  isInvalid={!!errors.bankName}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bankName}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>
                  Cheque Number <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="chequeNumber"
                  value={formData.chequeNumber}
                  isInvalid={!!errors.chequeNumber}
                  onChange={handleChange}
                  maxLength={6}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.chequeNumber}
                </Form.Control.Feedback>
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting || !isFormValid || loadingFeeTypes}
        >
          {isSubmitting ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Processing...
            </>
          ) : (
            "Process Payment"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;