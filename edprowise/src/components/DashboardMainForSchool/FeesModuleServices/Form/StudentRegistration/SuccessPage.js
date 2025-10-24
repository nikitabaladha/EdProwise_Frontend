// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import postAPI from '../../../../../api/postAPI'; 
// import { toast } from 'react-toastify';
// import { Container, Alert, Spinner } from 'react-bootstrap';

// const SuccessPage = () => {
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

//     postAPI('/payment/success', postData)
//       .then((response) => {
//         const res = response.data;
//         if (res.success) {
//           setMessage('Payment successful! Registration number assigned.');
//           toast.success('Payment verified and recorded.');
//           setTimeout(() => navigate('/school-dashboard/fees-module/form/registration'), 3000); 
//         } else {
//           setMessage('Payment verification failed. Please contact support.');
//           toast.error(res.message);
//         }
//       })
//       .catch((error) => {
//         console.error('Verification error:', error);
//         setMessage('Error verifying payment. Please contact support.');
//         toast.error('Verification failed.');
//       })
//       .finally(() => setLoading(false));
//   }, [location, navigate]);

//   if (loading) {
//     return (
//       <Container className="mt-5 text-center">
//         <Spinner animation="border" />
//         <p>Verifying payment...</p>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-5">
//       <Alert variant={message.includes('successful') ? 'success' : 'danger'}>
//         <h4>{message}</h4>
//         {message.includes('successful') && <p>Check your student dashboard for details.</p>}
//       </Alert>
//     </Container>
//   );
// };

// export default SuccessPage;

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
    
    // Clear session storage
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
          <Button variant="outline-success" onClick={() => navigate('/school-dashboard/fees-module/form/registration')}>
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