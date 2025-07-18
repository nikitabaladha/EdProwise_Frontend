// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { FaPrint, FaDownload } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { fetchSchoolData, generateHeader, generateFooter } from '../../PdfUtlis';

// const RefundReceipt = () => {
//   const location = useLocation();
//   const { refund, refundTypeName, className, sectionName } = location.state || {};
//   const [schoolData, setSchoolData] = useState({ school: null, logoSrc: '' });

//   useEffect(() => {
  
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     const id = userDetails?.schoolId;

//     const loadSchoolData = async () => {
//       try {
//         const data = await fetchSchoolData(id);
//         setSchoolData(data);
//       } catch (error) {
//         toast.error('Failed to fetch school data. Please try again.');
//         console.error('Error in loadSchoolData:', error);
//       }
//     };

//     if (id) {
//       loadSchoolData();
//     }
//   }, [location.state, className, sectionName, refund]);

//   const printReceipt = () => {
//     window.print();
//   };

//   const downloadReceiptAsPDF = async () => {
//     const element = document.getElementById('receipt-content');
//     if (!element) {
//       toast.error('Receipt content not found. Please try again.');
//       return;
//     }

//     const wrapper = document.createElement('div');
//     wrapper.style.cssText = `
//       width: 210mm;
//       min-height: 297mm;
//       padding: 10mm 15mm 22mm 15mm;
//       background: white;
//       font-family: 'Arial', sans-serif;
//       position: absolute;
//       left: -9999px;
//       box-sizing: border-box;
//       font-size: 18px;
//       line-height: 1.4;
//     `;

//     const contentWithoutHeaderFooter = element.cloneNode(true);
//     const headerElement = contentWithoutHeaderFooter.querySelector('.header-class');
//     const footerElement = contentWithoutHeaderFooter.querySelector('.footer-class');
//     if (headerElement) headerElement.remove();
//     if (footerElement) footerElement.remove();

//     wrapper.innerHTML = `
//       ${generateHeader(schoolData.school, schoolData.logoSrc)}
//       ${contentWithoutHeaderFooter.outerHTML}
//       ${generateFooter(schoolData.school)}
//     `;

//     const footer = wrapper.querySelector('.footer-class');
//     if (footer) {
//       footer.style.position = 'absolute';
//       footer.style.bottom = '10mm';
//       footer.style.textAlign = 'center';
//     }

//     document.body.appendChild(wrapper);

//     const images = wrapper.querySelectorAll('img');
//     await Promise.all(
//       Array.from(images).map(
//         (img) =>
//           new Promise((resolve) => {
//             img.crossOrigin = 'anonymous';
//             if (img.complete) resolve();
//             else {
//               img.onload = resolve;
//               img.onerror = resolve;
//             }
//           })
//       )
//     );

//     const canvas = await html2canvas(wrapper, {
//       scale: 2,
//       useCORS: true,
//       logging: false,
//       backgroundColor: '#ffffff',
//       windowWidth: 794,
//       windowHeight: 1123,
//     });

//     const pdf = new jsPDF({
//       unit: 'mm',
//       format: 'a4',
//       orientation: 'portrait',
//     });

//     const imgWidth = 210;
//     const pageHeight = 297;
//     const canvasHeight = Math.min((canvas.height * imgWidth) / canvas.width, pageHeight);

//     pdf.addImage(canvas.toDataURL('image/jpeg', 0.98), 'JPEG', 0, 0, imgWidth, canvasHeight);
//     pdf.save(`refund_receipt_${refund?.receiptNumber || 'unknown'}.pdf`);

//     document.body.removeChild(wrapper);
//   };

//   return (
//     <div className="container my-4" style={{ maxWidth: '800px' }}>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="text-primary">
//           <strong>Refund Receipt</strong>
//         </h4>
//         <div>
//           <button
//             onClick={printReceipt}
//             className="btn btn-outline-primary me-2"
//             style={{ borderRadius: '20px' }}
//           >
//             <FaPrint className="me-1" /> Print
//           </button>
//           <button
//             onClick={downloadReceiptAsPDF}
//             className="btn btn-primary"
//             style={{ borderRadius: '20px' }}
//           >
//             <FaDownload className="me-1" /> Download PDF
//           </button>
//         </div>
//       </div>

//       <div
//         id="receipt-content"
//         className="p-4 shadow-sm"
//         style={{ backgroundColor: '#ffffff', position: 'relative', minHeight: '297mm' }}
//       >
//         <div className="header-class" dangerouslySetInnerHTML={{ __html: generateHeader(schoolData.school, schoolData.logoSrc) }} />

//         <h3 className="text-center text-uppercase mb-3" style={{ color: '#0d6efd' }}>
//           <strong>Refund Receipt</strong>
//         </h3>

//         <div className="row mb-4 text-black">
//           <div className="col-md-6">
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '120px' }}>
//                 Receipt No:
//               </span>
//               <span>{refund?.receiptNumber || 'N/A'}</span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '120px' }}>
//                 Student Name:
//               </span>
//               <span>
//                 {refund?.firstName && refund?.lastName ? `${refund.firstName} ${refund.lastName}` : 'N/A'}
//               </span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '120px' }}>
//                 {refundTypeName === 'Registration Fees' ? 'Registration No:' : 'Admission No:'}
//               </span>
//               <span>{refundTypeName === 'Registration Fees' ? refund?.registrationNumber || 'N/A' : refund?.admissionNumber || 'N/A'}</span>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '120px' }}>
//                 Date:
//               </span>
//               <span>
//                 {refund?.refundDate ? new Date(refund.refundDate).toLocaleDateString('en-GB') : 'N/A'}
//               </span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '120px' }}>
//                 Academic Year:
//               </span>
//               <span>{refund?.academicYear || 'N/A'}</span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '120px' }}>
//                 Class/Section:
//               </span>
//               <span>{className && sectionName ? `${className}/${sectionName}` : className || 'N/A'}</span>
//             </div>
//           </div>
//         </div>

//         <div className="table-responsive mb-4">
//           <table className="table table-bordered">
//             <thead className="table-primary">
//               <tr>
//                 <th className="text-center">Refund Type</th>
//                 <th className="text-center">Paid Amount (₹)</th>
//                   <th className="text-center">Balance (₹)</th>
//                 <th className="text-center">Refund Amount (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="text-center">{refundTypeName || 'N/A'}</td>
//                 <td className="text-center">{refund?.paidAmount || '0'}</td>
//                 <td className="text-center">{refund?.balance || '0'}</td>
//                 <td className="text-center">{refund?.refundAmount || '0'}</td>
//               </tr>
//               <tr className="table-active">
//                 <td colSpan="3" className="text-end fw-bold">
//                   Total Refunded:
//                 </td>
//                 <td className="text-center fw-bold">{refund?.refundAmount || '0'}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className="row mb-4 text-black">
//           <div className="col-md-6">
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '150px' }}>
//                 Payment Mode:
//               </span>
//               <span className="text-capitalize">{refund?.paymentMode || 'N/A'}</span>
//             </div>
//             {refund?.paymentMode?.toLowerCase() === 'cheque' && (
//               <>
//                 <div className="d-flex mb-2">
//                   <span className="fw-bold me-2" style={{ minWidth: '150px' }}>
//                     Cheque No:
//                   </span>
//                   <span>{refund?.chequeNumber || 'N/A'}</span>
//                 </div>
//                 <div className="d-flex mb-2">
//                   <span className="fw-bold me-2" style={{ minWidth: '150px' }}>
//                     Bank Name:
//                   </span>
//                   <span>{refund?.bankName || 'N/A'}</span>
//                 </div>
//               </>
//             )}
//             {refund?.paymentMode?.toLowerCase() === 'online' && (
//               <div className="d-flex mb-2">
//                 <span className="fw-bold me-2" style={{ minWidth: '150px' }}>
//                   Transaction ID:
//                 </span>
//                 <span>{refund?.transactionNumber || 'N/A'}</span>
//               </div>
//             )}
//           </div>
//           <div className="col-md-6">
//             <div className="p-3 text-center" style={{ height: '100%' }}>
//               <p className="mb-4">Authorized Signature</p>
//               <div className="mt-4 pt-3" style={{ borderTop: '1px solid #dee2e6' }}>
//                 <p className="mb-0 fw-bold">{schoolData.school?.schoolName || 'School Administrator'}</p>
//                 <p className="mb-0 small text-muted">Receipt Collector</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           className="footer-class"
//           style={{
//             position: 'absolute',
//             bottom: '10mm',
//             left: 0,
//             right: 0,
//             textAlign: 'center',
//             width: '100%',
//             boxSizing: 'border-box',
//           }}
//           dangerouslySetInnerHTML={{ __html: generateFooter(schoolData.school) }}
//         />
//       </div>
//     </div>
//   );
// };

// export default RefundReceipt;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPrint, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { fetchSchoolData, generateHeader, generateFooter } from '../../PdfUtlis';

const RefundReceipt = () => {
  const location = useLocation();
  const { refund, refundTypeName, className, sectionName } = location.state || {};
  const [schoolData, setSchoolData] = useState({ school: null, logoSrc: '' });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const id = userDetails?.schoolId;

    const loadSchoolData = async () => {
      try {
        const data = await fetchSchoolData(id);
        setSchoolData(data);
      } catch (error) {
        toast.error('Failed to fetch school data. Please try again.');
        console.error('Error in loadSchoolData:', error);
      }
    };

    if (id) {
      loadSchoolData();
    }
  }, [location.state, className, sectionName, refund]);

  const printReceipt = () => {
    window.print();
  };

  const downloadReceiptAsPDF = async () => {
    const element = document.getElementById('receipt-content');
    if (!element) {
      toast.error('Receipt content not found. Please try again.');
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 210mm;
      min-height: 297mm;
      padding: 10mm 15mm 22mm 15mm;
      background: white;
      font-family: 'Arial', sans-serif;
      position: absolute;
      left: -9999px;
      box-sizing: border-box;
      font-size: 18px;
      line-height: 1.4;
    `;

    const contentWithoutHeaderFooter = element.cloneNode(true);
    const headerElement = contentWithoutHeaderFooter.querySelector('.header-class');
    const footerElement = contentWithoutHeaderFooter.querySelector('.footer-class');
    if (headerElement) headerElement.remove();
    if (footerElement) footerElement.remove();

    wrapper.innerHTML = `
      ${generateHeader(schoolData.school, schoolData.logoSrc)}
      ${contentWithoutHeaderFooter.outerHTML}
      ${generateFooter(schoolData.school)}
    `;

    const footer = wrapper.querySelector('.footer-class');
    if (footer) {
      footer.style.position = 'absolute';
      footer.style.bottom = '10mm';
      footer.style.textAlign = 'center';
    }

    document.body.appendChild(wrapper);

    const images = wrapper.querySelectorAll('img');
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            img.crossOrigin = 'anonymous';
            if (img.complete) resolve();
            else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          })
      )
    );

    const canvas = await html2canvas(wrapper, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      windowHeight: 1123,
    });

    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const canvasHeight = Math.min((canvas.height * imgWidth) / canvas.width, pageHeight);

    pdf.addImage(canvas.toDataURL('image/jpeg', 0.98), 'JPEG', 0, 0, imgWidth, canvasHeight);
    pdf.save(`refund_receipt_${refund?.receiptNumber || 'unknown'}.pdf`);

    document.body.removeChild(wrapper);
  };

  return (
    <div className="container my-4" style={{ maxWidth: '800px' }}>
      <div className="d-flex justify-content-between align-items-center MCMb-4">
        <h4 className="text-primary">
          <strong>Refund Receipt</strong>
        </h4>
        <div>
          <button
            onClick={printReceipt}
            className="btn btn-outline-primary me-2"
            style={{ borderRadius: '20px' }}
          >
            <FaPrint className="me-1" /> Print
          </button>
          <button
            onClick={downloadReceiptAsPDF}
            className="btn btn-primary"
            style={{ borderRadius: '20px' }}
          >
            <FaDownload className="me-1" /> Download PDF
          </button>
        </div>
      </div>

      <div
        id="receipt-content"
        className="p-4 shadow-sm"
        style={{ backgroundColor: '#ffffff', position: 'relative', minHeight: '297mm' }}
      >
        <div className="header-class" dangerouslySetInnerHTML={{ __html: generateHeader(schoolData.school, schoolData.logoSrc) }} />

        <h3 className="text-center text-uppercase mb-3" style={{ color: '#0d6efd' }}>
          <strong>Refund Receipt</strong>
        </h3>

        <div className="row mb-4 text-black">
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: '120px' }}>
                Receipt No:
              </span>
              <span>{refund?.receiptNumber || 'N/A'}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: '120px' }}>
                Student Name:
              </span>
              <span>
                {refund?.firstName && refund?.lastName ? `${refund.firstName} ${refund.lastName}` : 'N/A'}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: '120px' }}>
                {refundTypeName === 'Registration Fees' ? 'Registration No:' : 'Admission No:'}
              </span>
              <span>{refundTypeName === 'Registration Fees' ? refund?.registrationNumber || 'N/A' : refund?.admissionNumber || 'N/A'}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: '120px' }}>
                Date:
              </span>
              <span>
                {refund?.refundDate ? new Date(refund.refundDate).toLocaleDateString('en-GB') : 'N/A'}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: '120px' }}>
                Academic Year:
              </span>
              <span>{refund?.academicYear || 'N/A'}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: '120px' }}>
                Class/Section:
              </span>
              <span>{className && sectionName ? `${className}/${sectionName}` : className || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="table-responsive mb-4">
          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th className="text-center">{refundTypeName === 'School Fees' ? 'Fee Type' : 'Refund Type'}</th>
                <th className="text-center">Paid Amount (₹)</th>
                <th className="text-center">Balance (₹)</th>
                <th className="text-center">Refund Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {refundTypeName === 'School Fees' && refund?.feeTypeRefunds?.length > 0 ? (
                refund.feeTypeRefunds.map((feeType, index) => (
                  <tr key={index}>
                    <td className="text-center">{feeType.feetype.feesTypeName || feeType.feeTypeName || 'NA'}</td>
                    <td className="text-center">{feeType.paidAmount || '0'}</td>
                    <td className="text-center">{feeType.balance || '0'}</td>
                    <td className="text-center">{feeType.refundAmount || '0'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center">{refundTypeName || 'N/A'}</td>
                  <td className="text-center">{refund?.paidAmount || '0'}</td>
                  <td className="text-center">{refund?.balance || '0'}</td>
                  <td className="text-center">{refund?.refundAmount || '0'}</td>
                </tr>
              )}
              <tr className="table-active">
                <td colSpan="3" className="text-end fw-bold">
                  Total Refunded:
                </td>
                <td className="text-center fw-bold">{refund?.refundAmount || '0'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="row mb-4 text-black">
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: '150px' }}>
                Payment Mode:
              </span>
              <span className="text-capitalize">{refund?.paymentMode || 'N/A'}</span>
            </div>
            {refund?.paymentMode?.toLowerCase() === 'cheque' && (
              <>
                <div className="d-flex mb-2">
                  <span className="fw-bold me-2" style={{ minWidth: '150px' }}>
                    Cheque No:
                  </span>
                  <span>{refund?.chequeNumber || 'N/A'}</span>
                </div>
                <div className="d-flex mb-2">
                  <span className="fw-bold me-2" style={{ minWidth: '150px' }}>
                    Bank Name:
                  </span>
                  <span>{refund?.bankName || 'N/A'}</span>
                </div>
              </>
            )}
            {refund?.paymentMode?.toLowerCase() === 'online' && (
              <div className="d-flex mb-2">
                <span className="fw-bold me-2" style={{ minWidth: '150px' }}>
                  Transaction ID:
                </span>
                <span>{refund?.transactionNumber || 'N/A'}</span>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <div className="p-3 text-center" style={{ height: '100%' }}>
              <p className="mb-4">Authorized Signature</p>
              <div className="mt-4 pt-3" style={{ borderTop: '1px solid #dee2e6' }}>
                <p className="mb-0 fw-bold">{schoolData.school?.schoolName || 'School Administrator'}</p>
                <p className="mb-0 small text-muted">Receipt Collector</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="footer-class"
          style={{
            position: 'absolute',
            bottom: '10mm',
            left: 0,
            right: 0,
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box',
          }}
          dangerouslySetInnerHTML={{ __html: generateFooter(schoolData.school) }}
        />
      </div>
    </div>
  );
};

export default RefundReceipt;