
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Alert, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const SuccessPage = () => {
  const location = useNavigate();
  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const txnId = params.get('txnId');
    const status = params.get('status');
    const paymentId = params.get('paymentId');

    setPaymentInfo({ txnId, status, paymentId });

    toast.success('Payment completed successfully!');


    sessionStorage.removeItem('easebuzzPayment');

  }, [location]);

  return (
    <Container className="mt-5">
      <Alert variant="success">
        <Alert.Heading>Payment Successful!</Alert.Heading>
        <hr />
        {paymentInfo?.txnId && (
          <p><strong>Transaction ID:</strong> {paymentInfo.txnId}</p>
        )}
        {paymentInfo?.paymentId && (
          <p><strong>Payment Reference:</strong> {paymentInfo.paymentId}</p>
        )}
        <p>Your payment has been processed successfully. A confirmation receipt has been generated.</p>

        <div className="d-flex justify-content-between">
          <Button variant="outline-success" onClick={() => navigate('/school-dashboard/fees-module/form/admission')}>
            View Receipt
          </Button>
          <Button variant="primary" onClick={() => navigate('/school-dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default SuccessPage;