// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import postAPI from '../../../../../api/postAPI'; 
// import { toast } from 'react-toastify';
// import { Container, Alert, Spinner } from 'react-bootstrap';

// const FailurePage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const postData = Object.fromEntries(params.entries());

//     if (!postData.txnid) {
//       toast.error('Invalid payment response.');
//       navigate('/school-dashboard/fees-module/form/registration');
//       return;
//     }

//     postAPI('/payment/failure', postData)
//       .then((response) => {
//         const res = response.data;
//         setMessage('Payment failed. Record stored for reference. Please try again.');
//         toast.error('Payment failed.');
//         setTimeout(() => navigate('/school-dashboard/fees-module/form/registration'), 3000);
//       })
//       .catch((error) => {
//         console.error('Verification error:', error);
//         setMessage('Error processing failure. Please contact support.');
//         toast.error('Processing failed.');
//       })
//       .finally(() => setLoading(false));
//   }, [location, navigate]);

//   if (loading) {
//     return (
//       <Container className="mt-5 text-center">
//         <Spinner animation="border" />
//         <p>Processing response...</p>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-5">
//       <Alert variant="danger">
//         <h4>{message}</h4>
//         <p>You can retry the payment from the student details page.</p>
//       </Alert>
//     </Container>
//   );
// };

// export default FailurePage;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Alert, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const FailurePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const txnId = params.get('txnId');
    const status = params.get('status');
    const paymentId = params.get('paymentId');
    const error = params.get('error');

    const info = {
      txnId,
      status,
      paymentId,
      error,
      message: params.get('message')
    };

    setPaymentInfo(info);

    if (status === 'failed') {
      toast.error('Payment failed. Please try again.');
    } else if (error) {
      toast.error(`Payment error: ${error}`);
    } else {
      toast.error('Payment was not successful.');
    }

    sessionStorage.removeItem('easebuzzPayment');

  }, [location]);

  const handleRetry = () => {
    navigate('/school-dashboard/fees-module/form/registration');
  };

  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <Alert.Heading>Payment Failed</Alert.Heading>
        <hr />
        {paymentInfo?.txnId && (
          <p><strong>Transaction ID:</strong> {paymentInfo.txnId}</p>
        )}
        {paymentInfo?.paymentId && (
          <p><strong>Payment Reference:</strong> {paymentInfo.paymentId}</p>
        )}
        <p>Your payment was not completed successfully. This could be due to:</p>
        <ul>
          <li>Transaction cancellation</li>
          <li>Payment gateway issues</li>
          <li>Insufficient funds</li>
          <li>Technical error</li>
        </ul>
        <p>No amount has been deducted from your account. Please try again.</p>
        
        <div className="d-flex justify-content-between">
          <Button variant="outline-danger" onClick={handleRetry}>
            Try Payment Again
          </Button>
          <Button variant="primary" onClick={() => navigate('/school-dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default FailurePage;