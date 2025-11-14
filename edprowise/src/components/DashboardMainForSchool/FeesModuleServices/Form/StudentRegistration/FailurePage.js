
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Container, Alert, Button } from 'react-bootstrap';
// import { toast } from 'react-toastify';

// const FailurePage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [paymentInfo, setPaymentInfo] = useState(null);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const txnId = params.get('txnId');
//     const status = params.get('status');
//     const paymentId = params.get('paymentId');
//     const error = params.get('error');

//     const info = {
//       txnId,
//       status,
//       paymentId,
//       error,
//       message: params.get('message')
//     };

//     setPaymentInfo(info);

//     if (status === 'failed') {
//       toast.error('Payment failed. Please try again.');
//     } else if (error) {
//       toast.error(`Payment error: ${error}`);
//     } else {
//       toast.error('Payment was not successful.');
//     }

//     sessionStorage.removeItem('easebuzzPayment');

//   }, [location]);

//   const handleRetry = () => {
//     navigate('/school-dashboard/fees-module/form/registration');
//   };

//   return (
//     <Container className="mt-5">
//       <Alert variant="danger">
//         <Alert.Heading>Payment Failed</Alert.Heading>
//         <hr />
//         {paymentInfo?.txnId && (
//           <p><strong>Transaction ID:</strong> {paymentInfo.txnId}</p>
//         )}
//         {paymentInfo?.paymentId && (
//           <p><strong>Payment Reference:</strong> {paymentInfo.paymentId}</p>
//         )}
//         <p>Your payment was not completed successfully. This could be due to:</p>
//         <ul>
//           <li>Transaction cancellation</li>
//           <li>Payment gateway issues</li>
//           <li>Insufficient funds</li>
//           <li>Technical error</li>
//         </ul>
//         <p>No amount has been deducted from your account. Please try again.</p>

//         <div className="d-flex justify-content-between">
//           {/* <Button variant="outline-danger" onClick={handleRetry}>
//             Try Payment Again
//           </Button> */}
//           {/* <Button variant="primary" onClick={() => navigate('/school-dashboard')}>
//             Go to Dashboard
//           </Button> */}
//             <Button variant="primary" onClick={() => navigate(-1)}>
//                       Go to Home
//                     </Button>
//         </div>
//       </Alert>
//     </Container>
//   );
// };

// export default FailurePage;



import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"


const FailurePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [paymentInfo, setPaymentInfo] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const txnId = params.get("txnId")
    const status = params.get("status")
    const paymentId = params.get("paymentId")
    const error = params.get("error")

    const info = {
      txnId,
      status,
      paymentId,
      error,
      message: params.get("message"),
    }

    setPaymentInfo(info)
    sessionStorage.removeItem("easebuzzPayment")
  }, [location.search])



  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f3ff 0%, #fff5f7 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
          padding: "60px 40px",
          textAlign: "center",
          animation: "slideIn 0.6s ease-out",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 30px",
            background: "linear-gradient(135deg, #ff6b6b, #ff8787)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            animation: "bounce 0.6s ease-out",
            color: "white",
          }}
        >
          ✕
        </div>

        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#1a1a1a",
            margin: "0 0 15px 0",
            letterSpacing: "-0.5px",
          }}
        >
          Payment Failed
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#666",
            margin: "0 0 30px 0",
            lineHeight: "1.6",
          }}
        >
         We're sorry, but your payment could not be completed. If any amount was deducted, it will be automatically refunded to your account shortly.
        </p>

        <div
          style={{
            background: "#f8f7fc",
            borderRadius: "12px",
            padding: "25px",
            marginBottom: "30px",
            textAlign: "left",
            borderLeft: "4px solid #ff6b6b",
          }}
        >
          {paymentInfo?.txnId && (
            <div
              style={{
                marginBottom: "15px",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#999", fontWeight: "500" }}>Transaction ID</span>
              <p style={{ margin: "5px 0 0 0", color: "#1a1a1a", fontWeight: "600", fontSize: "15px" }}>
                {paymentInfo.txnId}
              </p>
            </div>
          )}
          {paymentInfo?.paymentId && (
            <div
              style={{
                marginBottom: "15px",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#999", fontWeight: "500" }}>Payment Reference</span>
              <p style={{ margin: "5px 0 0 0", color: "#1a1a1a", fontWeight: "600", fontSize: "15px" }}>
                {paymentInfo.paymentId}
              </p>
            </div>
          )}
          {paymentInfo?.error && (
            <div style={{ fontSize: "14px" }}>
              <span style={{ color: "#999", fontWeight: "500" }}>Error Details</span>
              <p style={{ margin: "5px 0 0 0", color: "#d32f2f", fontWeight: "500", fontSize: "14px" }}>
                {paymentInfo.error}
              </p>
            </div>
          )}
        </div>

        <div
          style={{
            textAlign: "left",
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#1a1a1a",
              marginBottom: "12px",
            }}
          >
            This could be due to:
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: "0",
              margin: "0",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <li style={{ fontSize: "14px", color: "#555", paddingLeft: "24px", position: "relative" }}>
              <span style={{ position: "absolute", left: "0", color: "#ff6b6b", fontWeight: "bold" }}>•</span>
              Transaction cancelled
            </li>
            <li style={{ fontSize: "14px", color: "#555", paddingLeft: "24px", position: "relative" }}>
              <span style={{ position: "absolute", left: "0", color: "#ff6b6b", fontWeight: "bold" }}>•</span>
              Gateway issues
            </li>
            <li style={{ fontSize: "14px", color: "#555", paddingLeft: "24px", position: "relative" }}>
              <span style={{ position: "absolute", left: "0", color: "#ff6b6b", fontWeight: "bold" }}>•</span>
              Insufficient funds
            </li>
            <li style={{ fontSize: "14px", color: "#555", paddingLeft: "24px", position: "relative" }}>
              <span style={{ position: "absolute", left: "0", color: "#ff6b6b", fontWeight: "bold" }}>•</span>
              Technical error
            </li>
          </ul>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexDirection: "column",
          }}
        >
    

          <button
             onClick={() => navigate(-1)}
            style={{
              padding: "14px 24px",
              background: "white",
              color: "#667eea",
              border: "2px solid #e0e0e0",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#667eea"
              e.target.style.background = "#f5f3ff"
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#e0e0e0"
              e.target.style.background = "white"
            }}
          >
            Go Back
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0) rotate(-45deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }

        @media (max-width: 600px) {
          body {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  )
}

export default FailurePage;