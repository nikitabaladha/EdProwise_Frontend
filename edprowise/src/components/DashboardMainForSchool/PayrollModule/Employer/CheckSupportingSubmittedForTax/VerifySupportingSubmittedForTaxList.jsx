// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

// const VerifySupportingSubmittedForTaxList = () => {
//     const navigate = useNavigate();

//     const [isBuyer, setIsBuyer] = useState(true);
//     const [isYes, setIsYes] = useState(true);
//     const [isYes1, setIsYes1] = useState(true);
//     const [isYes2, setIsYes2] = useState(true);

//     const handleToggle = () => {
//         setIsBuyer(!isBuyer);
//     };

//     const handleToggleYes = () => {
//         setIsYes(!isYes);
//     };

//     const handleToggleYes1 = () => {
//         setIsYes1(!isYes1);
//     };

//     const handleToggleYes2 = () => {
//         setIsYes2(!isYes2);
//     };

//     const handleNavigateToRentDetails = () => {
//         navigate("/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/verify-rent-details");
//     };

//     return (
//         <>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-xl-12">
//                         <div className="card m-2">
//                             <div className="card-body custom-heading-padding">
//                                 <div className="container">
//                                     <div className="card-header d-flex align-items-center">
//                                         <h4 className="card-title flex-grow-1 text-center">
//                                             Supporting Submitted for Tax
//                                         </h4>
//                                         <button
//                                             type="button"
//                                             className="btn btn-primary custom-submit-button"
//                                             onClick={() => navigate(-1)}
//                                         >
//                                             Back
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <form onSubmit="">
//                                     {/* <div className='d-flex'> */}
//                                     <div className="row m-0 mb-2 pt-2 salary-slip-box">
//                                         <div className="col-md-8">
//                                             <p className='text-dark payroll-box-text'>
//                                                 <strong>Employee Name : </strong>Umesh jadhav
//                                             </p>

//                                         </div>

//                                         <div className="col-md-4">
//                                             <p className='text-dark payroll-box-text' >
//                                                 <strong>Employee ID : </strong>Emp-001
//                                             </p>
//                                         </div>

//                                         <div className="col-md-4">

//                                             <p className='text-dark payroll-box-text'>
//                                                 <strong>Tax Regime :</strong>
//                                             </p>
//                                         </div>

//                                         <div className="col-md-4">
//                                             <p className='text-dark payroll-box-text' >
//                                                 <strong> PAN No :</strong> CPJPKPP1
//                                             </p>
//                                         </div>

//                                         <div className="col-md-4">
//                                             <p className='text-dark' >
//                                                 <label for="yearSelect" className="mb-0 payroll-box-text fw-bold">Financial Year : </label>
//                                                 <select id="yearSelect" className="custom-select payroll-table-body" aria-label="Select Year" style={{ marginLeft: "5px" }}>
//                                                     <option selected>2025-26</option>
//                                                     <option>2026</option>
//                                                     <option>2027</option>
//                                                     <option>2028</option>
//                                                     <option>2029</option>
//                                                 </select>
//                                             </p>
//                                         </div>

//                                     </div>

//                                     <div className="table-responsive mb-4">
//                                         <table className="table text-dark border border-dark  mb-4" >
//                                             <thead>
//                                                 <tr className="payroll-table-header">
//                                                     <th className="text-center align-content-center border border-dark p-2">
//                                                         Investment
//                                                     </th>
//                                                     <th className="text-center align-content-center border border-dark p-2">
//                                                         Limit
//                                                     </th>
//                                                     <th className="text-center align-content-center border border-dark p-2">
//                                                         Declared
//                                                     </th>
//                                                     <th className="text-center align-content-center border border-dark p-2">
//                                                         Proof Submitted
//                                                     </th>

//                                                     <th className="text-center align-content-center border border-dark p-2">
//                                                         Document
//                                                     </th>
//                                                     <th className="text-center align-content-center border border-dark p-2">
//                                                         Action
//                                                     </th>
//                                                     <th className="text-center align-content-center border border-dark p-2">
//                                                         Admin Remarks
//                                                     </th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 <tr className='it-declaration-section-bg payroll-box-text fw-bold'  >
//                                                     <td className="align-content-center border border-dark fw-bold p-2">
//                                                         Section 80C
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >
//                                                         1,00,000
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >
//                                                         1,00,000
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >
//                                                         1,70,000
//                                                     </td>

//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body' >
//                                                     <td className="align-content-center border border-dark  px-3 py-2" >
//                                                         Life Insurance Premium including Bima Nivesh( only Self , Spouse and children)
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required
//                                                             value={"50,000"}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required
//                                                             value={"40,000"}
//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >

//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-light btn-sm"
//                                                             >
//                                                                 <iconify-icon
//                                                                     icon="solar:eye-broken"
//                                                                     className="align-middle fs-18"
//                                                                 />
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Provident Fund
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                             value={"50,000"}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required
//                                                             value={"50,000"}
//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="p-2 align-content-center border border-dark px-3" >
//                                                         Tuition Fees
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>

//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required
//                                                             value={"50,000"}
//                                                         />
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body' >
//                                                     <td className="align-content-center px-3 border border-dark p-2" >
//                                                         Term Deposits(Bank tax saving FD)
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                             value={"90,000"}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required
//                                                             value={"80,000"}
//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Sukanya Samriddhi Account
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required

//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Housing Loan Principal/Stamp Duty & Registration
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required

//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Unit Link Insurance Plan / Infrastructure Bond / National Saving Certificate / Accrued Interest on NSC
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required

//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Subscription To Notified Central Government Security (NSS) / Mutual Funds/ELSS and Others / Pension Fund
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required

//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='it-declaration-section-bg payroll-box-text fw-bold'  >
//                                                     <td className="align-content-center border border-dark fw-bold p-2">
//                                                         Section 80D
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >
//                                                         20,000
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >
//                                                         20,000
//                                                     </td>

//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Medical Insurance Premium For Self,Spouse and Dependent Children (If all are non-senior citizen)
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         25,000
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                             value={"20,000"}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required
//                                                             value={"20,000"}
//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body' >
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Medical Insurance Premium For parents(Non-senior citizen)
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         25,000
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required

//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center px-3 border border-dark p-2" >
//                                                         Medical Insurance Premium For Parents (Senior citizen)
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         50,000
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required

//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Medical Expenditure For Senior Citizen (self) (If No Insurance Premium)
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         50,000
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required

//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Medical Expenditure For Senior Citizen(Parents) (If No Insurance Premium)
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         50,000
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required

//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
//                                                     <td className="align-content-center border border-dark fw-bold p-2" >
//                                                         Other Section
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >
//                                                         45,000
//                                                     </td>

//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Deduction For Dependent With Disability( Form 10-I) (Flat Dedcution of INR 75000) (Yes/No)
//                                                         <div
//                                                             className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
//                                                             style={{
//                                                                 maxWidth: "fit-content"
//                                                             }}
//                                                         >
//                                                             <button
//                                                                 className={`btn ${isBuyer ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                 type='button'
//                                                                 style={{
//                                                                     backgroundColor: isBuyer ? 'white' : 'black',
//                                                                     borderColor: isBuyer ? 'black' : '',
//                                                                     color: isBuyer ? 'black' : 'white',
//                                                                     maxWidth: "fit-content",
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none"
//                                                                 }}
//                                                                 onClick={handleToggle}
//                                                             >
//                                                                 Yes
//                                                             </button>
//                                                             <button
//                                                                 type='button'
//                                                                 className={`btn ${!isBuyer ? 'btn-primary' : 'btn-dark'}  rounded-pill`}
//                                                                 style={{
//                                                                     backgroundColor: !isBuyer ? 'white' : 'black',
//                                                                     borderColor: !isBuyer ? 'black' : ' ',
//                                                                     color: !isBuyer ? 'black' : 'white',
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none",
//                                                                     maxWidth: "fit-content"
//                                                                 }}
//                                                                 onClick={handleToggle}
//                                                             >
//                                                                 No
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         75,000
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required

//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Deduction For Dependent With Severe Disability( Form 10-I) (Flat dedcution of INR 125000) (Yes/No)
//                                                         <div
//                                                             className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
//                                                             style={{
//                                                                 maxWidth: "fit-content"
//                                                             }}
//                                                         >
//                                                             <button
//                                                                 className={`btn ${isYes ? 'btn-primary' : 'btn-dark'}  rounded-pill`}
//                                                                 type='button'
//                                                                 style={{
//                                                                     backgroundColor: isYes ? 'white' : 'black',
//                                                                     borderColor: isYes ? 'black' : '',
//                                                                     color: isYes ? 'black' : 'white',
//                                                                     // color: 'black',
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none",
//                                                                     maxWidth: "fit-content"
//                                                                 }}
//                                                                 onClick={handleToggleYes}
//                                                             >
//                                                                 Yes
//                                                             </button>
//                                                             <button
//                                                                 type='button'
//                                                                 className={`btn ${!isYes ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                 style={{
//                                                                     backgroundColor: !isYes ? 'white' : 'black',
//                                                                     borderColor: !isYes ? 'black' : ' ',
//                                                                     color: !isYes ? 'black' : 'white',
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none",
//                                                                     maxWidth: "fit-content"
//                                                                 }}
//                                                                 onClick={handleToggleYes}
//                                                             >
//                                                                 No
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         1,00,000
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required

//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body' >
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Deduction For Self Disability (Flat dedcution of INR 75000) (Yes/No)
//                                                         <div
//                                                             className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
//                                                             style={{
//                                                                 maxWidth: "fit-content"
//                                                             }}
//                                                         >
//                                                             <button
//                                                                 className={`btn ${isYes1 ? 'btn-primary' : 'btn-dark'}  rounded-pill`}
//                                                                 type='button'
//                                                                 style={{
//                                                                     backgroundColor: isYes1 ? 'white' : 'black',
//                                                                     borderColor: isYes1 ? 'black' : '',
//                                                                     color: isYes1 ? 'black' : 'white',
//                                                                     maxWidth: "fit-content",
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none"
//                                                                 }}
//                                                                 onClick={handleToggleYes1}
//                                                             >
//                                                                 Yes
//                                                             </button>
//                                                             <button
//                                                                 type='button'
//                                                                 className={`btn ${!isYes1 ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                 style={{
//                                                                     backgroundColor: !isYes1 ? 'white' : 'black',
//                                                                     borderColor: !isYes1 ? 'black' : ' ',
//                                                                     color: !isYes1 ? 'black' : 'white',
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none",
//                                                                     maxWidth: "fit-content"
//                                                                 }}
//                                                                 onClick={handleToggleYes1}
//                                                             >
//                                                                 No
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         75,000
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required

//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Deduction For Self Severe Disability (Flat dedcution of INR 125000) (Yes/No)
//                                                         <div
//                                                             className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
//                                                             style={{
//                                                                 maxWidth: "fit-content"
//                                                             }}
//                                                         >
//                                                             <button
//                                                                 className={`btn ${isYes2 ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                 type='button'
//                                                                 style={{
//                                                                     backgroundColor: isYes2 ? 'white' : 'black',
//                                                                     borderColor: isYes2 ? 'black' : '',
//                                                                     color: isYes2 ? 'black' : 'white',
//                                                                     maxWidth: "fit-content",
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none"
//                                                                 }}
//                                                                 onClick={handleToggleYes2}
//                                                             >
//                                                                 Yes
//                                                             </button>
//                                                             <button
//                                                                 type='button'
//                                                                 className={`btn ${!isYes2 ? 'btn-primary' : 'btn-dark'}  rounded-pill`}
//                                                                 style={{
//                                                                     backgroundColor: !isYes2 ? 'white' : 'black',
//                                                                     borderColor: !isYes2 ? 'black' : ' ',
//                                                                     color: !isYes2 ? 'black' : 'white',
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none",
//                                                                     maxWidth: "fit-content"
//                                                                 }}
//                                                                 onClick={handleToggleYes2}
//                                                             >
//                                                                 No
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         1,00,000
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required

//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Mediclaim Expenses For Critical Illness (Deduction allowed to the extent of expenses incurred , Maximum of INR 40000)
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         40,000
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required
//                                                             value={"10,000"}
//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body' >
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Mediclaim Expenses For Critical Illness - Senior Citizen (Deduction allowed to the extent of expenses incurred , Maximum of INR 100000)
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         20,000
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required
//                                                             value={"25,000"}
//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Interest On Educational Loan For Higher Studies (u/s 80E) - Self
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required
//                                                             value={"10,000"}
//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                         >
//                                                             <iconify-icon
//                                                                 icon="solar:eye-broken"
//                                                                 className="align-middle fs-18"
//                                                             />
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                         />
//                                                     </td>
//                                                 </tr>

//                                                 <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                     <td className="align-content-center fw-bold border border-dark p-2" >
//                                                         HRA Exemption
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark fw-bold p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required
//                                                             value={"10,000"}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "
//                                                             required
//                                                             value={"10,000"}
//                                                         />
//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark fw-bold p-2" >
//                                                         <button
//                                                             type="button"
//                                                             className="btn btn-link p-0"
//                                                             onClick={handleNavigateToRentDetails}
//                                                             style={{
//                                                                 color: "red",
//                                                                 // textDecoration: "underline",
//                                                                 fontWeight: "bold",
//                                                                 fontSize: "1rem"
//                                                             }}
//                                                         >
//                                                             Rent Details
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark fw-bold p-2" >
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark fw-bold p-2" >
//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body' >
//                                                     <td className="align-content-center border border-dark px-3 p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >

//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                 </tr>

//                                                 <tr >
//                                                     <td colSpan={7} className="align-content-center border border-dark fw-bold p-2" >
//                                                         I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax.
//                                                     </td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                     <div className="text-end">
//                                         <button
//                                             type="submit"
//                                             className="btn btn-primary custom-submit-button"
//                                         >
//                                             Verified
//                                         </button>
//                                     </div>


//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default VerifySupportingSubmittedForTaxList;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';
// import putAPI from '../../../../../api/putAPI';
// const VerifySupportingSubmittedForTaxList = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [declaration, setDeclaration] = useState(null);
//     const [schoolId, setSchoolId] = useState(null);
//     const [academicYear, setAcademicYear] = useState('2025-26');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [previewDocument, setPreviewDocument] = useState(null);

//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//         if (!userDetails?.schoolId) {
//             toast.error('School ID not found. Please log in again.');
//             navigate('/login');
//             return;
//         }
//         setSchoolId(userDetails.schoolId);

//         // Get declaration data from location state
//         if (location.state?.declaration) {
//             setDeclaration(location.state.declaration);
//         } else {
//             toast.error('No declaration data found');

//         }
//     }, [navigate, location.state]);

//     const handleYearChange = (e) => {
//         setAcademicYear(e.target.value);
//     };

//     const handleRemarkChange = (section, index, value) => {
//         setDeclaration((prev) => ({
//             ...prev,
//             [section]: {
//                 ...prev[section],
//                 items: prev[section].items.map((item, i) =>
//                     i === index ? { ...item, adminRemarks: value } : item
//                 ),
//             },
//         }));
//     };

//     const handleStatusChange = async (section, index, status) => {
//         try {
//             const updatedItems = declaration[section].items.map((item, i) =>
//                 i === index ? { ...item, status } : item
//             );

//             const response = await postAPI(
//                 `/it-declaration/update/${schoolId}/${declaration.employeeId}`,
//                 {
//                     academicYear,
//                     [section]: {
//                         ...declaration[section],
//                         items: updatedItems,
//                     },
//                 },
//                 { 'Content-Type': 'application/json' },
//                 true
//             );

//             if (!response.hasError) {
//                 setDeclaration((prev) => ({
//                     ...prev,
//                     [section]: {
//                         ...prev[section],
//                         items: updatedItems,
//                     },
//                 }));
//                 toast.success(`${section} status updated successfully`);
//             } else {
//                 toast.error(response.message || 'Failed to update status');
//             }
//         } catch (error) {
//             toast.error('Error updating status: ' + error.message);
//         }
//     };

//     const handleDocumentPreview = (documentPath) => {
//         if (documentPath) {
//             setPreviewDocument(documentPath);
//         } else {
//             toast.error('No document available for preview');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         try {
//             const response = await postAPI(
//                 `/it-declaration/update/${schoolId}/${declaration.employeeId}`,
//                 {
//                     academicYear,
//                     section80C: declaration.section80C,
//                     section80D: declaration.section80D,
//                     otherSections: declaration.otherSections,
//                     status: 'Verification Done',
//                 },
//                 { 'Content-Type': 'application/json' },
//                 true
//             );

//             if (!response.hasError) {
//                 toast.success('IT Declaration verified successfully');
//                 navigate(-1);
//             } else {
//                 toast.error(response.message || 'Failed to verify declaration');
//             }
//         } catch (error) {
//             toast.error('Error verifying declaration: ' + error.message);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN').format(amount || 0);
//     };

//     const getFileName = (documentPath) => {
//         if (documentPath) {
//             const fullName = documentPath.split('\\').pop().split('/').pop() || 'Document';
//             return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
//         }
//         return 'No file';
//     };

//     if (!declaration) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="container">
//                                 <div className="card-header d-flex align-items-center">
//                                     <h4 className="card-title flex-grow-1 text-center">
//                                         Supporting Submitted for Tax
//                                     </h4>
//                                     <button
//                                         type="button"
//                                         className="btn btn-primary custom-submit-button"
//                                         onClick={() => navigate(-1)}
//                                     >
//                                         Back
//                                     </button>
//                                 </div>
//                             </div>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="row m-0 mb-2 pt-2 salary-slip-box">
//                                     <div className="col-md-8">
//                                         <p className="text-dark payroll-box-text">
//                                             <strong>Employee Name: </strong>{declaration.employeeName || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className="text-dark payroll-box-text">
//                                             <strong>Employee ID: </strong>{declaration.employeeId || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className="text-dark payroll-box-text">
//                                             <strong>Tax Regime: </strong>{declaration.taxRegime === 'new' ? 'New' : 'Old'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className="text-dark payroll-box-text">
//                                             <strong>PAN No: </strong>{declaration.panNumber || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className="text-dark">
//                                             <label htmlFor="yearSelect" className="mb-0 payroll-box-text fw-bold">
//                                                 Financial Year:
//                                             </label>
//                                             <select
//                                                 id="yearSelect"
//                                                 className="custom-select payroll-table-body"
//                                                 aria-label="Select Year"
//                                                 style={{ marginLeft: '5px' }}
//                                                 value={academicYear}
//                                                 onChange={handleYearChange}
//                                             >
//                                                 <option value="2025-26">2025-26</option>
//                                                 <option value="2026-27">2026-27</option>
//                                                 <option value="2027-28">2027-28</option>
//                                                 <option value="2028-29">2028-29</option>
//                                                 <option value="2029-30">2029-30</option>
//                                             </select>
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="table-responsive mb-4">
//                                     <table className="table text-dark border border-dark mb-4">
//                                         <thead>
//                                             <tr className="payroll-table-header">
//                                                 <th className="text-center align-content-center border border-dark p-2">Investment</th>
//                                                 <th className="text-center align-content-center border border-dark p-2">Limit</th>
//                                                 <th className="text-center align-content-center border border-dark p-2">Proof Submitted</th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "100px" }}>
//                                                     Final Ded.
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark p-2">Document</th>
//                                                 <th className="text-center align-content-center border border-dark p-2">Action</th>
//                                                 <th className="text-center align-content-center border border-dark p-2">Admin Remarks</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Section 80C</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {formatCurrency(declaration.section80C.sectionLimit)}
//                                                 </td>

//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {formatCurrency(
//                                                         declaration.section80C.items.reduce((sum, item) => sum + (item.proofSubmitted || 0), 0)
//                                                     )}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {formatCurrency(
//                                                         declaration.section80C.finalDeduction
//                                                     )}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {declaration.section80C.items.map((item, index) => (
//                                                 <tr key={`80C-${index}`} className="payroll-table-body">
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(item.proofSubmitted)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2">
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                             onClick={() => handleDocumentPreview(item.proofDocument)}
//                                                             disabled={!item.proofDocument}
//                                                         >
//                                                             <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
//                                                         </button>
//                                                         <div className="mt-2">
//                                                             <small>{getFileName(item.proofDocument)}</small>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2">
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                                 onClick={() => handleStatusChange('section80C', index, 'Approved')}
//                                                                 disabled={item.status === 'Approved'}
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                                 onClick={() => handleStatusChange('section80C', index, 'Rejected')}
//                                                                 disabled={item.status === 'Rejected'}
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.adminRemarks || ''}
//                                                             onChange={(e) => handleRemarkChange('section80C', index, e.target.value)}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                             <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Section 80D</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {formatCurrency(
//                                                         declaration.section80D.items.reduce((sum, item) => sum + (item.proofSubmitted || 0), 0)
//                                                     )}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {formatCurrency(
//                                                     declaration.section80D.finalDeduction
//                                                 )}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>

//                                             </tr>
//                                             {declaration.section80D.items.map((item, index) => (
//                                                 <tr key={`80D-${index}`} className="payroll-table-body">
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(item.categoryLimit)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(item.proofSubmitted)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(item.categoryFinalDeduction)}
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2">
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                             onClick={() => handleDocumentPreview(item.proofDocument)}
//                                                             disabled={!item.proofDocument}
//                                                         >
//                                                             <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
//                                                         </button>
//                                                         <div className="mt-2">
//                                                             <small>{getFileName(item.proofDocument)}</small>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2">
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                                 onClick={() => handleStatusChange('section80D', index, 'Approved')}
//                                                                 disabled={item.status === 'Approved'}
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                                 onClick={() => handleStatusChange('section80D', index, 'Rejected')}
//                                                                 disabled={item.status === 'Rejected'}
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.adminRemarks || ''}
//                                                             onChange={(e) => handleRemarkChange('section80D', index, e.target.value)}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                             <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Other Sections</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {formatCurrency(
//                                                         declaration.otherSections.items.reduce((sum, item) => sum + (item.proofSubmitted || 0), 0)
//                                                     )}
//                                                 </td> 
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {formatCurrency(
//                                                     declaration.otherSections.finalDeduction
//                                                 )}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>

//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {declaration.otherSections.items.map((item, index) => (
//                                                 <tr key={`other-${index}`} className="payroll-table-body">
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(item.categoryLimit)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(item.proofSubmitted)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(item.categoryFinalDeduction)}
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2">
//                                                         <button
//                                                             className="btn btn-light btn-sm"
//                                                             onClick={() => handleDocumentPreview(item.proofDocument)}
//                                                             disabled={!item.proofDocument}
//                                                         >
//                                                             <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
//                                                         </button>
//                                                         <div className="mt-2">
//                                                             <small>{getFileName(item.proofDocument)}</small>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2">
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                                 onClick={() => handleStatusChange('otherSections', index, 'Approved')}
//                                                                 disabled={item.status === 'Approved'}
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                                 onClick={() => handleStatusChange('otherSections', index, 'Rejected')}
//                                                                 disabled={item.status === 'Rejected'}
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.adminRemarks || ''}
//                                                             onChange={(e) => handleRemarkChange('otherSections', index, e.target.value)}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                             <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                                                 <td className="align-content-center border border-dark fw-bold p-2">HRA Exemption</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {formatCurrency(declaration.hraExemption.proofSubmitted)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>

//                                                 <td className="text-center align-content-center border border-dark fw-bold p-2">
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-link p-0"
//                                                         onClick={() =>
//                                                             navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/verify-rent-details', {
//                                                                 state: { rentDetailsId: declaration.hraExemption.rentDetailsId },
//                                                             })
//                                                         }
//                                                         style={{
//                                                             color: 'red',
//                                                             fontWeight: 'bold',
//                                                             fontSize: '1rem',
//                                                         }}
//                                                     >
//                                                         Rent Details
//                                                     </button>
//                                                 </td>
//                                                 <td className="text-center align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             <tr>
//                                                 <td colSpan={7} className="align-content-center border border-dark fw-bold p-2">
//                                                     I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax.
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>
//                                 <div className="text-end">
//                                     <button type="submit" className="btn btn-primary custom-submit-button" disabled={isSubmitting}>
//                                         {isSubmitting ? 'Verifying...' : 'Verified'}
//                                     </button>
//                                 </div>
//                             </form>

//                             {previewDocument && (
//                                 <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//                                     <div className="modal-dialog modal-lg">
//                                         <div className="modal-content">
//                                             <div className="modal-header">
//                                                 <h5 className="modal-title">Document Preview</h5>
//                                                 <button
//                                                     type="button"
//                                                     className="btn-close"
//                                                     onClick={() => setPreviewDocument(null)}
//                                                 ></button>
//                                             </div>
//                                             <div className="modal-body">
//                                                 {previewDocument.endsWith('.pdf') ? (
//                                                     <iframe
//                                                         src={previewDocument}
//                                                         style={{ width: '100%', height: '500px' }}
//                                                         title="Document Preview"
//                                                     ></iframe>
//                                                 ) : (
//                                                     <img src={previewDocument} alt="Document" style={{ maxWidth: '100%' }} />
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default VerifySupportingSubmittedForTaxList;


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import putAPI from '../../../../../api/putAPI';

// const VerifySupportingSubmittedForTaxList = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [declaration, setDeclaration] = useState(null);
//   const [schoolId, setSchoolId] = useState(null);
//   const [academicYear, setAcademicYear] = useState('2025-26');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [previewDocument, setPreviewDocument] = useState(null);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     if (!userDetails?.schoolId) {
//       toast.error('School ID not found. Please log in again.');
//       navigate('/login');
//       return;
//     }
//     setSchoolId(userDetails.schoolId);

//     if (location.state?.declaration) {
//       setDeclaration(location.state.declaration);
//     } else {
//       toast.error('No declaration data found');
//       navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted');
//     }
//   }, [navigate, location.state]);

//   const handleYearChange = (e) => {
//     setAcademicYear(e.target.value);
//   };

//   const handleRemarkChange = (section, index, value) => {
//     setDeclaration((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         items: prev[section].items.map((item, i) =>
//           i === index ? { ...item, adminRemarks: value } : item
//         ),
//       },
//     }));
//   };

//   const handleStatusChange = async (section, index, status) => {
//     try {
//       setIsSubmitting(true);
//       const updatedItems = declaration[section].items.map((item, i) =>
//         i === index ? { ...item, status, finalDeduction: status === 'Approved' ? item.proofSubmitted : 0 } : item
//       );

//       const response = await putAPI(
//         `/it-declaration/update/${schoolId}/${declaration.employeeId}`,
//         {
//           academicYear,
//           [section]: {
//             ...declaration[section],
//             items: updatedItems,
//           },
//         },
//         { 'Content-Type': 'application/json' },
//         true
//       );

//       if (!response.hasError) {
//         setDeclaration((prev) => ({
//           ...prev,
//           [section]: {
//             ...prev[section],
//             items: updatedItems,  
//           },
//         }));
//         toast.success(`${section} status updated to ${status}`);
//       } else {
//         toast.error(response.message || 'Failed to update status');
//       }
//     } catch (error) {
//       toast.error('Error updating status: ' + error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDocumentPreview = (documentPath) => {
//     if (documentPath) { 
//       const formattedPath = documentPath.startsWith('http')
//         ? documentPath
//         : `${process.env.REACT_APP_API_URL_FOR_IMAGE}/${documentPath}`;
//       setPreviewDocument(formattedPath);
//     } else {
//       toast.error('No document available for preview');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await putAPI(
//         `/it-declaration/update/${schoolId}/${declaration.employeeId}`,
//         {
//           academicYear,
//           section80C: {
//             ...declaration.section80C,

//           },
//           section80D: {
//             ...declaration.section80D,
//           },
//           otherSections: {
//             ...declaration.otherSections,
//           },
//           status: 'Verification Done',
//         },
//         { 'Content-Type': 'application/json' },
//         true
//       );

//       if (!response.hasError) {
//         toast.success('IT Declaration verified successfully');
//         // navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted');
//       } else {
//         toast.error(response.message || 'Failed to verify declaration');
//       }
//     } catch (error) {
//       toast.error('Error verifying declaration: ' + error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN').format(amount || 0);
//   };

//   const getFileName = (documentPath) => {
//     if (documentPath) {
//       const fullName = documentPath.split('\\').pop().split('/').pop() || 'Document';
//       return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
//     }
//     return 'No file';
//   };

//   if (!declaration) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Supporting Submitted for Tax
//                   </h4>
//                   <button
//                     type="button"
//                     className="btn btn-primary custom-submit-button"
//                     onClick={() => navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted')}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="row m-0 mb-2 pt-2 salary-slip-box">
//                   <div className="col-md-8">
//                     <p className="text-dark payroll-box-text">
//                       <strong>Employee Name: </strong>{declaration.employeeName || 'N/A'}
//                     </p>
//                   </div>
//                   <div className="col-md-4">
//                     <p className="text-dark payroll-box-text">
//                       <strong>Employee ID: </strong>{declaration.employeeId || 'N/A'}
//                     </p>
//                   </div>
//                   <div className="col-md-4">
//                     <p className="text-dark payroll-box-text">
//                       <strong>Tax Regime: </strong>{declaration.taxRegime === 'new' ? 'New' : 'Old'}
//                     </p>
//                   </div>
//                   <div className="col-md-4">
//                     <p className="text-dark payroll-box-text">
//                       <strong>PAN No: </strong>{declaration.panNumber || 'N/A'}
//                     </p>
//                   </div>
//                   <div className="col-md-4">
//                     <p className="text-dark">
//                       <label htmlFor="yearSelect" className="mb-0 payroll-box-text fw-bold">
//                         Financial Year:
//                       </label>
//                       <select
//                         id="yearSelect"
//                         className="custom-select"
//                         aria-label="Select Year"
//                         style={{ marginLeft: '5px' }}
//                         value={academicYear}
//                         onChange={handleYearChange}
//                       >
//                         <option value="2025-26">2025-26</option>
//                         <option value="2026-27">2026-27</option>
//                         <option value="2027-28">2027-28</option>
//                         <option value="2028-29">2028-29</option>
//                         <option value="2029-30">2029-30</option>
//                       </select>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="table-responsive mb-4">
//                   <table className="table text-dark border border-dark mb-4">
//                     <thead>
//                       <tr className="payroll-table-header">
//                         <th className="text-center align-content-center border border-dark p-2">Investment</th>
//                         <th className="text-center align-content-center border border-dark p-2">Limit</th>
//                         <th className="text-center align-content-center border border-dark p-2">Proof Submitted</th>
//                         <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "100px" }}>
//                           Final Ded.
//                         </th>
//                         <th className="text-center align-content-center border border-dark p-2">Document</th>
//                         <th className="text-center align-content-center border border-dark p-2">Action</th>
//                         <th className="text-center align-content-center border border-dark p-2">Admin Remarks</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                         <td className="align-content-center border border-dark fw-bold p-2">Section 80C</td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(declaration.section80C.sectionLimit)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(
//                             declaration.section80C.items.reduce((sum, item) => sum + (item.proofSubmitted || 0), 0)
//                           )}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(declaration.section80C.finalDeduction)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                       </tr>
//                       {declaration.section80C.items.map((item, index) => (
//                         <tr key={`80C-${index}`} className="payroll-table-body">
//                           <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                           <td className="text-end align-content-center border border-dark p-2"></td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.proofSubmitted)}
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {/* {formatCurrency(item.finalDeduction || 0)} */}
//                           </td>
//                           <td className="text-center align-content-center border border-dark p-2">
//                             <button
//                               type='button'
//                               className="btn btn-light btn-sm"
//                               onClick={() => handleDocumentPreview(item.proofDocument)}
//                               disabled={!item.proofDocument}
//                             >
//                               <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
//                             </button>
//                             <div className="mt-2">
//                               <small>{getFileName(item.proofDocument)}</small>
//                             </div>
//                           </td>
//                           <td className="text-center align-content-center border border-dark p-2">
//                             <div className="d-flex justify-content-center gap-2">
//                               <button
//                                 className="btn btn-primary btn-sm"
//                                 onClick={() => handleStatusChange('section80C', index, 'Approved')}
//                                 disabled={item.status === 'Approved' || isSubmitting}
//                               >
//                                 Accept
//                               </button>
//                               <button
//                                 type='button'
//                                 className="btn btn-danger btn-sm"
//                                 onClick={() => handleStatusChange('section80C', index, 'Rejected')}
//                                 disabled={item.status === 'Rejected' || isSubmitting}
//                               >
//                                 Reject
//                               </button>
//                             </div>
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={item.adminRemarks || ''}
//                               onChange={(e) => handleRemarkChange('section80C', index, e.target.value)}
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                       <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                         <td className="align-content-center border border-dark fw-bold p-2">Section 80D</td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(
//                             declaration.section80D.items.reduce((sum, item) => sum + (item.proofSubmitted || 0), 0)
//                           )}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(declaration.section80D.finalDeduction)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                       </tr>
//                       {declaration.section80D.items.map((item, index) => (
//                         <tr key={`80D-${index}`} className="payroll-table-body">
//                           <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.categoryLimit)}
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.proofSubmitted)}
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.categoryFinalDeduction || 0)}
//                           </td>
//                           <td className="text-center align-content-center border border-dark p-2">
//                             <button
//                               type='button'
//                               className="btn btn-light btn-sm"
//                               onClick={() => handleDocumentPreview(item.proofDocument)}
//                               disabled={!item.proofDocument}
//                             >
//                               <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
//                             </button>
//                             <div className="mt-2">
//                               <small>{getFileName(item.proofDocument)}</small>
//                             </div>
//                           </td>
//                           <td className="text-center align-content-center border border-dark p-2">
//                             <div className="d-flex justify-content-center gap-2">
//                               <button
//                                 type='button'
//                                 className="btn btn-primary btn-sm"
//                                 onClick={() => handleStatusChange('section80D', index, 'Approved')}
//                                 disabled={item.status === 'Approved' || isSubmitting}
//                               >
//                                 Accept
//                               </button>
//                               <button
//                                 className="btn btn-danger btn-sm"
//                                 onClick={() => handleStatusChange('section80D', index, 'Rejected')}
//                                 disabled={item.status === 'Rejected' || isSubmitting}
//                               >
//                                 Reject
//                               </button>
//                             </div>
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={item.adminRemarks || ''}
//                               onChange={(e) => handleRemarkChange('section80D', index, e.target.value)}
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                       <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                         <td className="align-content-center border border-dark fw-bold p-2">Other Sections</td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(
//                             declaration.otherSections.items.reduce((sum, item) => sum + (item.proofSubmitted || 0), 0)
//                           )}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(declaration.otherSections.finalDeduction)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                       </tr>
//                       {declaration.otherSections.items.map((item, index) => (
//                         <tr key={`other-${index}`} className="payroll-table-body">
//                           <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.categoryLimit)}
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.proofSubmitted)}
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.categoryFinalDeduction || 0)}
//                           </td>
//                           <td className="text-center align-content-center border border-dark p-2">
//                             <button
//                               type='button'
//                               className="btn btn-light btn-sm"
//                               onClick={() => handleDocumentPreview(item.proofDocument)}
//                               disabled={!item.proofDocument}
//                             >
//                               <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
//                             </button>
//                             <div className="mt-2">
//                               <small>{getFileName(item.proofDocument)}</small>
//                             </div>
//                           </td>
//                           <td className="text-center align-content-center border border-dark p-2">
//                             <div className="d-flex justify-content-center gap-2">
//                               <button
//                                 type='button'
//                                 className="btn btn-primary btn-sm"
//                                 onClick={() => handleStatusChange('otherSections', index, 'Approved')}
//                                 disabled={item.status === 'Approved' || isSubmitting}
//                               >
//                                 Accept
//                               </button>
//                               <button
//                                 className="btn btn-danger btn-sm"
//                                 onClick={() => handleStatusChange('otherSections', index, 'Rejected')}
//                                 disabled={item.status === 'Rejected' || isSubmitting}
//                               >
//                                 Reject
//                               </button>
//                             </div>
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={item.adminRemarks || ''}
//                               onChange={(e) => handleRemarkChange('otherSections', index, e.target.value)}
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                       <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                         <td className="align-content-center border border-dark fw-bold p-2">HRA Exemption</td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(declaration.hraExemption.proofSubmitted)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-center align-content-center border border-dark fw-bold p-2">
//                           <button
//                             type="button"
//                             className="btn btn-link p-0"
//                             onClick={() =>
//                               navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/verify-rent-details', {
//                                 state: { rentDetailsId: declaration.hraExemption.rentDetailsId },
//                               })
//                             }
//                             style={{
//                               color: 'red',
//                               fontWeight: 'bold',
//                               fontSize: '1rem',
//                             }}
//                           >
//                             Rent Details
//                           </button>
//                         </td>
//                         <td className="text-center align-content-center border border-dark fw-bold p-2">{(declaration.hraExemption.status)}</td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                       </tr>
//                       {/* <tr>
//                         <td colSpan={7} className="align-content-center border border-dark fw-bold p-2">
//                           I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax.
//                         </td>
//                       </tr> */}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="text-end">
//                   <button type="submit" className="btn btn-primary custom-submit-button" disabled={isSubmitting}>
//                     {isSubmitting ? 'Verifying...' : 'Verified'}
//                   </button>
//                 </div>
//               </form>

//               {previewDocument && (
//                 <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//                   <div className="modal-dialog modal-lg">
//                     <div className="modal-content">
//                       <div className="modal-header">
//                         <h5 className="modal-title">Document Preview</h5>
//                         <button
//                           type="button"
//                           className="btn-close"
//                           onClick={() => setPreviewDocument(null)}
//                         ></button>
//                       </div>
//                       <div className="modal-body">
//                         {previewDocument.endsWith('.pdf') ? (
//                           <iframe
//                             src={`${previewDocument}#toolbar=0`}
//                             style={{ width: '100%', height: '500px', border: 'none' }}
//                             title="Document Preview"
//                           ></iframe>
//                         ) : (
//                           <img
//                             src={previewDocument}
//                             alt="Document"
//                             style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '10px' }}
//                             onError={() => {
//                               toast.error('Failed to load document');
//                               setPreviewDocument(null);
//                             }}
//                           />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifySupportingSubmittedForTaxList;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import putAPI from '../../../../../api/putAPI';

// const VerifySupportingSubmittedForTaxList = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [declaration, setDeclaration] = useState(null);
//   const [schoolId, setSchoolId] = useState(null);
//   const [academicYear, setAcademicYear] = useState('2025-26');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [previewDocument, setPreviewDocument] = useState(null);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     if (!userDetails?.schoolId) {
//       toast.error('School ID not found. Please log in again.');
//       navigate('/login');
//       return;
//     }
//     setSchoolId(userDetails.schoolId);

//     if (location.state?.declaration) {
//       setDeclaration(location.state.declaration);
//     } else {
//       toast.error('No declaration data found');
//       navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted');
//     }
//   }, [navigate, location.state]);

//   const handleYearChange = (e) => {
//     setAcademicYear(e.target.value);
//   };

//   const handleRemarkChange = (section, index, value) => {
//     setDeclaration((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         items: prev[section].items.map((item, i) =>
//           i === index ? { ...item, adminRemarks: value } : item
//         ),
//       },
//     }));
//   };

//   const handleStatusChange = async (section, index, status) => {
//     try {
//       setIsSubmitting(true);
//       const updatedItems = declaration[section].items.map((item, i) =>
//         i === index ? { ...item, status, } : item
//       );

//       const response = await putAPI(
//         `/it-declaration/update/${schoolId}/${declaration.employeeId}`,
//         {
//           academicYear,
//           [section]: {
//             ...declaration[section],
//             items: updatedItems,
//           },
//         },
//         { 'Content-Type': 'application/json' },
//         true
//       );

//       if (!response.hasError) {
//         setDeclaration((prev) => ({
//           ...prev,
//           [section]: {
//             ...prev[section],
//             items: updatedItems,
//           },
//         }));
//         toast.success(`${section} status updated to ${status}`);
//       } else {
//         toast.error(response.message || 'Failed to update status');
//       }
//     } catch (error) {
//       toast.error('Error updating status: ' + error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDocumentPreview = (documentPath) => {
//     if (documentPath) {
//       const formattedPath = documentPath.startsWith('http')
//         ? documentPath
//         : `${process.env.REACT_APP_API_URL_FOR_IMAGE}/${documentPath}`;
//       setPreviewDocument(formattedPath);
//     } else {
//       toast.error('No document available for preview');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await putAPI(
//         `/it-declaration/update/${schoolId}/${declaration.employeeId}`,
//         {
//           academicYear,
//           section80C: declaration.section80C,
//           section80D: declaration.section80D,
//           otherSections: declaration.otherSections,
//           hraExemption: declaration.hraExemption,
//           status: 'Verification Done',
//         },
//         { 'Content-Type': 'application/json' },
//         true
//       );

//       if (!response.hasError) {
//         toast.success('IT Declaration verified successfully');
//         navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted');
//       } else {
//         toast.error(response.message || 'Failed to verify declaration');
//       }
//     } catch (error) {
//       toast.error('Error verifying declaration: ' + error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN').format(amount || 0);
//   };

//   const getFileName = (documentPath) => {
//     if (documentPath) {
//       const fullName = documentPath.split('\\').pop().split('/').pop() || 'Document';
//       return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
//     }
//     return 'No file';
//   };

//   if (!declaration) {
//     return <div>Loading...</div>;
//   }
// const handleNavigateToLtaDetails = () => {
//     navigate(
//       '/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/lta-list',
//       {
//         state: {
//           employeeId: declaration.employeeId,
//           academicYear,
//         },
//       }
//     );
//   };

//     const handleNavigateToTelephoneDetails = () => {
//         navigate("/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/telephone-allowance-list");
//     };

//     const handleNavigateToInternetDetails = () => {
//         navigate("/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/internet-allowance-list");
//     };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Supporting Submitted for Tax
//                   </h4>
//                   <button
//                     type="button"
//                     className="btn btn-primary custom-submit-button"
//                     onClick={() => navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted')}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="row m-0 mb-2 pt-2 salary-slip-box">
//                   <div className="col-md-8">
//                     <p className="text-dark payroll-box-text">
//                       <strong>Employee Name: </strong>{declaration.employeeName || 'N/A'}
//                     </p>
//                   </div>
//                   <div className="col-md-4">
//                     <p className="text-dark payroll-box-text">
//                       <strong>Employee ID: </strong>{declaration.employeeId || 'N/A'}
//                     </p>
//                   </div>
//                   <div className="col-md-4">
//                     <p className="text-dark payroll-box-text">
//                       <strong>Tax Regime: </strong>{declaration.taxRegime === 'new' ? 'New' : 'Old'}
//                     </p>
//                   </div>
//                   <div className="col-md-4">
//                     <p className="text-dark payroll-box-text">
//                       <strong>PAN No: </strong>{declaration.panNumber || 'N/A'}
//                     </p>
//                   </div>
//                   <div className="col-md-4">
//                     <p className="text-dark">
//                       <label htmlFor="yearSelect" className="mb-0 payroll-box-text fw-bold">
//                         Financial Year:
//                       </label>
//                       <select
//                         id="yearSelect"
//                         className="custom-select"
//                         aria-label="Select Year"
//                         style={{ marginLeft: '5px' }}
//                         value={academicYear}
//                         onChange={handleYearChange}
//                       >
//                         <option value="2025-26">2025-26</option>
//                         <option value="2026-27">2026-27</option>
//                         <option value="2027-28">2027-28</option>
//                         <option value="2028-29">2028-29</option>
//                         <option value="2029-30">2029-30</option>
//                       </select>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="table-responsive mb-4">
//                   <table className="table text-dark border border-dark mb-4">
//                     <thead>
//                       <tr className="payroll-table-header">
//                         <th className="text-center align-content-center border border-dark p-2">Investment</th>
//                         <th className="text-center align-content-center border border-dark p-2">Limit</th>
//                         <th className="text-center align-content-center border border-dark p-2">Proof Submitted</th>
//                         <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "100px" }}>
//                           Final Ded.
//                         </th>
//                         <th className="text-center align-content-center border border-dark p-2">Document</th>
//                         <th className="text-center align-content-center border border-dark p-2">Action</th>
//                         <th className="text-center align-content-center border border-dark p-2">Admin Remarks</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                         <td className="align-content-center border border-dark fw-bold p-2">Section 80C</td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(declaration.section80C.sectionLimit)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(
//                             declaration.section80C.items.reduce((sum, item) => sum + (item.proofSubmitted || 0), 0)
//                           )}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(declaration.section80C.finalDeduction)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                       </tr>
//                       {declaration.section80C.items.map((item, index) => (
//                         <tr key={`80C-${index}`} className="payroll-table-body">
//                           <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                           <td className="text-end align-content-center border border-dark p-2"></td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.proofSubmitted)}
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.finalDeduction || 0)}
//                           </td>
//                           <td className="text-center align-content-center border border-dark p-2">
//                             <button
//                               type='button'
//                               className="btn btn-light btn-sm"
//                               onClick={() => handleDocumentPreview(item.proofDocument)}
//                               disabled={!item.proofDocument}
//                             >
//                               <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
//                             </button>
//                             <div className="mt-2">
//                               <small>{getFileName(item.proofDocument)}</small>
//                             </div>
//                           </td>
//                           <td className="text-center align-content-center border border-dark p-2">
//                             <div className="d-flex justify-content-center gap-2">
//                               <button
//                                 className="btn btn-primary btn-sm"
//                                 onClick={() => handleStatusChange('section80C', index, 'Approved')}
//                                 disabled={item.status === 'Approved' || isSubmitting}
//                               >
//                                 Accept
//                               </button>
//                               <button
//                                 type='button'
//                                 className="btn btn-danger btn-sm"
//                                 onClick={() => handleStatusChange('section80C', index, 'Rejected')}
//                                 disabled={item.status === 'Rejected' || isSubmitting}
//                               >
//                                 Reject
//                               </button>
//                             </div>
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={item.adminRemarks || ''}
//                               onChange={(e) => handleRemarkChange('section80C', index, e.target.value)}
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                       <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                         <td className="align-content-center border border-dark fw-bold p-2">Section 80D</td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(
//                             declaration.section80D.items.reduce((sum, item) => sum + (item.proofSubmitted || 0), 0)
//                           )}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(declaration.section80D.finalDeduction)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                       </tr>
//                       {declaration.section80D.items.map((item, index) => (
//                         <tr key={`80D-${index}`} className="payroll-table-body">
//                           <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.categoryLimit)}
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.proofSubmitted)}
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.categoryFinalDeduction || 0)}
//                           </td>
//                           <td className="text-center align-content-center border border-dark p-2">
//                             <button
//                               type='button'
//                               className="btn btn-light btn-sm"
//                               onClick={() => handleDocumentPreview(item.proofDocument)}
//                               disabled={!item.proofDocument}
//                             >
//                               <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
//                             </button>
//                             <div className="mt-2">
//                               <small>{getFileName(item.proofDocument)}</small>
//                             </div>
//                           </td>
//                           <td className="text-center align-content-center border border-dark p-2">
//                             <div className="d-flex justify-content-center gap-2">
//                               <button
//                                 type='button'
//                                 className="btn btn-primary btn-sm"
//                                 onClick={() => handleStatusChange('section80D', index, 'Approved')}
//                                 disabled={item.status === 'Approved' || isSubmitting}
//                               >
//                                 Accept
//                               </button>
//                               <button
//                                 className="btn btn-danger btn-sm"
//                                 onClick={() => handleStatusChange('section80D', index, 'Rejected')}
//                                 disabled={item.status === 'Rejected' || isSubmitting}
//                               >
//                                 Reject
//                               </button>
//                             </div>
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={item.adminRemarks || ''}
//                               onChange={(e) => handleRemarkChange('section80D', index, e.target.value)}
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                       <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                         <td className="align-content-center border border-dark fw-bold p-2">Other Sections</td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(
//                             declaration.otherSections.items.reduce((sum, item) => sum + (item.proofSubmitted || 0), 0)
//                           )}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(declaration.otherSections.finalDeduction)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                       </tr>
//                       {declaration.otherSections.items.map((item, index) => (
//                         <tr key={`other-${index}`} className="payroll-table-body">
//                           <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.categoryLimit)}
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.proofSubmitted)}
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {formatCurrency(item.categoryFinalDeduction || 0)}
//                           </td>
//                           <td className="text-center align-content-center border border-dark p-2">
//                             <button
//                               type='button'
//                               className="btn btn-light btn-sm"
//                               onClick={() => handleDocumentPreview(item.proofDocument)}
//                               disabled={!item.proofDocument}
//                             >
//                               <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
//                             </button>
//                             <div className="mt-2">
//                               <small>{getFileName(item.proofDocument)}</small>
//                             </div>
//                           </td>
//                           <td className="text-center align-content-center border border-dark p-2">
//                             <div className="d-flex justify-content-center gap-2">
//                               <button
//                                 type='button'
//                                 className="btn btn-primary btn-sm"
//                                 onClick={() => handleStatusChange('otherSections', index, 'Approved')}
//                                 disabled={item.status === 'Approved' || isSubmitting}
//                               >
//                                 Accept
//                               </button>
//                               <button
//                                 className="btn btn-danger btn-sm"
//                                 onClick={() => handleStatusChange('otherSections', index, 'Rejected')}
//                                 disabled={item.status === 'Rejected' || isSubmitting}
//                               >
//                                 Reject
//                               </button>
//                             </div>
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={item.adminRemarks || ''}
//                               onChange={(e) => handleRemarkChange('otherSections', index, e.target.value)}
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                       <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                         <td className="align-content-center border border-dark fw-bold p-2">HRA Exemption</td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(declaration.hraExemption.proofSubmitted)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           {formatCurrency(declaration.hraExemption.finalDeduction || 0)}
//                         </td>
//                         <td className="text-center align-content-center border border-dark fw-bold p-2">
//                           <button
//                             type="button"
//                             className="btn btn-link p-0"
//                             onClick={() =>
//                               navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/verify-rent-details', {
//                                 state: {
//                                   rentDetailsId: declaration.hraExemption.rentDetailsId,
//                                   rentDetails: declaration.hraExemption.rentDetails,
//                                   employeeId: declaration.employeeId,
//                                   academicYear
//                                 },
//                               })
//                             }
//                             style={{
//                               color: 'red',
//                               fontWeight: 'bold',
//                               fontSize: '1rem',
//                             }}
//                           >
//                             Rent Details
//                           </button>
//                         </td>
//                         <td className="text-center align-content-center border border-dark  p-2">

//                           {declaration.hraExemption.status || 'Pending'}
//                         </td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2">
//                           <input
//                             type="text"
//                             className="form-control payroll-table-body payroll-input-border text-end"
//                             value={declaration.hraExemption.adminRemarks || ''}
//                             onChange={(e) =>
//                               setDeclaration(prev => ({
//                                 ...prev,
//                                 hraExemption: { ...prev.hraExemption, adminRemarks: e.target.value }
//                               }))
//                             }
//                           />
//                         </td>
//                       </tr>
//                       <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                         <td className="align-content-center border border-dark fw-bold p-2">Other Exemption</td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-center align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                         <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                       </tr>
//                       <tr className='payroll-table-body'>
//                         <td className="align-content-center border border-dark px-3 py-2">LTA Exemption</td>
//                         <td className="text-end align-content-center border border-dark p-2">
//                           {formatCurrency(declaration.otherExemption?.ltaExemption?.categoryLimit)}
//                         </td> 
//                         <td className="text-end align-content-center border border-dark p-2">
//                           {formatCurrency(declaration.otherExemption?.ltaExemption?.proofSubmitted)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark p-2">
//                           {formatCurrency(declaration.otherExemption?.ltaExemption?.categoryFinalDeduction)}
//                         </td>
//                         <td className="text-center align-content-center border border-dark p-2">
//                           <button
//                             type="button"
//                             className="btn btn-link p-0"
//                             onClick={handleNavigateToLtaDetails}
//                             style={{
//                               color: "red",
//                               fontWeight: "bold",
//                               fontSize: "1rem"
//                             }}
//                           >
//                              LTA Details
//                           </button>
//                         </td> 
//                         <td className="text-center align-content-center border border-dark p-2">
//                           {declaration.otherExemption?.ltaExemption?.status}
//                         </td>
//                         <td className="text-start align-content-center border border-dark p-2">

//                           <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={declaration.otherExemption?.ltaExemption.adminRemarks || ''}
//                               onChange={(e) =>
//                               setDeclaration((prev) => ({
//                                 ...prev,
//                                 otherExemption: {
//                                   ...prev.otherExemption,
//                                   ltaExemption: {
//                                     ...prev.otherExemption.ltaExemption,
//                                     adminRemarks: e.target.value,
//                                   },
//                                 },
//                               }))
//                             }
//                             />
//                           </td>
//                       </tr>
//                       <tr className='payroll-table-body'>
//                         <td className="align-content-center border border-dark px-3 py-2">Telephone Allowance</td>
//                         <td className="text-end align-content-center border border-dark p-2">
//                           {formatCurrency(declaration.otherExemption?.telephoneAllowance?.categoryLimit)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark p-2">
//                           {formatCurrency(declaration.otherExemption?.telephoneAllowance?.proofSubmitted)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark p-2">
//                           {formatCurrency(declaration.otherExemption?.telephoneAllowance?.categoryFinalDeduction)}
//                         </td>
//                         <td className="text-center align-content-center border border-dark p-2">
//                           <button
//                             type="button"
//                             className="btn btn-link p-0"
//                             onClick={handleNavigateToTelephoneDetails}
//                             style={{
//                               color: "red",
//                               fontWeight: "bold",
//                               fontSize: "1rem"
//                             }}
//                           >
//                             Telephone Details
//                           </button>
//                         </td>
//                         <td className="text-center align-content-center border border-dark p-2">

//                           {declaration.otherExemption?.telephoneAllowance?.status}
//                         </td>
//                         <td className="text-start align-content-center border border-dark p-2">
//                           {declaration.otherExemption?.telephoneAllowance?.adminRemarks}
//                           </td>
//                       </tr>
//                       <tr className='payroll-table-body'>
//                         <td className="align-content-center border border-dark px-3 py-2">Internet Allowance</td>
//                         <td className="text-end align-content-center border border-dark p-2">
//                           {formatCurrency(declaration.otherExemption?.internetAllowance?.categoryLimit)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark p-2">
//                           {formatCurrency(declaration.otherExemption?.internetAllowance?.proofSubmitted)}
//                         </td>
//                         <td className="text-end align-content-center border border-dark p-2">
//                           {formatCurrency(declaration.otherExemption?.internetAllowance?.categoryFinalDeduction)}
//                         </td>
//                         <td className="text-center align-content-center border border-dark p-2">
//                           <button
//                             type="button"
//                             className="btn btn-link p-0"
//                             onClick={handleNavigateToInternetDetails}
//                             style={{
//                               color: "red",
//                               fontWeight: "bold",
//                               fontSize: "1rem"
//                             }}
//                           >
//                              Internet Details
//                           </button>
//                         </td>
//                         <td className="text-center align-content-center border border-dark p-2">

//                           {declaration.otherExemption?.internetAllowance?.status}
//                         </td>
//                         <td className="text-start align-content-center border border-dark p-2">
//                           {declaration.otherExemption?.internetAllowance?.adminRemarks}
//                           </td>
//                       </tr>

//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="text-end">
//                   <button type="submit" className="btn btn-primary custom-submit-button" disabled={isSubmitting}>
//                     {isSubmitting ? 'Verifying...' : 'Verified'}
//                   </button>
//                 </div>
//               </form>

//               {previewDocument && (
//                 <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//                   <div className="modal-dialog modal-lg">
//                     <div className="modal-content">
//                       <div className="modal-header">
//                         <h5 className="modal-title">Document Preview</h5>
//                         <button
//                           type="button"
//                           className="btn-close"
//                           onClick={() => setPreviewDocument(null)}
//                         ></button>
//                       </div>
//                       <div className="modal-body">
//                         {previewDocument.endsWith('.pdf') ? (
//                           <iframe
//                             src={`${previewDocument}#toolbar=0`}
//                             style={{ width: '100%', height: '500px', border: 'none' }}
//                             title="Document Preview"
//                           ></iframe>
//                         ) : (
//                           <img
//                             src={previewDocument}
//                             alt="Document"
//                             style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '10px' }}
//                             onError={() => {
//                               toast.error('Failed to load document');
//                               setPreviewDocument(null);
//                             }}
//                           />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifySupportingSubmittedForTaxList;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import putAPI from '../../../../../api/putAPI';
import getAPI from '../../../../../api/getAPI';

const VerifySupportingSubmittedForTaxList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [declaration, setDeclaration] = useState(null);
  const [schoolId, setSchoolId] = useState(null);
  const [academicYear, setAcademicYear] = useState(location.state?.academicYear || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId) {
      toast.error('School ID not found. Please log in again.');
      navigate('/login');
      return;
    }
    setSchoolId(userDetails.schoolId);

    if (location.state?.declaration) {
      setDeclaration(location.state.declaration);
    } else {
      toast.error('No declaration data found');
      navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted');
    }
  }, [navigate, location.state]);

  const handleYearChange = (e) => {
    // setAcademicYear(e.target.value);
  };

  const calculateSectionTotals = (section, items) => {
    const totalProofSubmitted = items.reduce((sum, item) => sum + (item.status === 'Approved' ? item.proofSubmitted || 0 : 0), 0);
    let finalDeduction = totalProofSubmitted;
    if (section === 'section80C') {
      finalDeduction = Math.min(totalProofSubmitted, declaration.section80C.sectionLimit || 150000);
    } else if (section === 'section80D') {
      finalDeduction = items.reduce((sum, item) => sum + (item.status === 'Approved' ? item.categoryFinalDeduction || 0 : 0), 0);
    } else if (section === 'otherSections') {
      finalDeduction = items.reduce((sum, item) => sum + (item.status === 'Approved' ? item.categoryFinalDeduction || 0 : 0), 0);
    }
    return { totalProofSubmitted, finalDeduction };
  };

  // const handleStatusChange = async (section, index, status) => {
  //   try {
  //     setIsSubmitting(true);
  //     let updatedItems = [...declaration[section].items];
  //     updatedItems[index] = {
  //       ...updatedItems[index],
  //       status,
  //       proofSubmitted: status === 'Rejected' ? 0 : updatedItems[index].proofSubmitted,
  //       categoryFinalDeduction: status === 'Rejected' ? 0 : updatedItems[index].categoryFinalDeduction || updatedItems[index].proofSubmitted,
  //     };

  //     const { totalProofSubmitted, finalDeduction } = calculateSectionTotals(section, updatedItems);

  //     const response = await putAPI(
  //       `/it-declaration/update/${schoolId}/${declaration.employeeId}`,
  //       {
  //         academicYear,
  //         [section]: {
  //           ...declaration[section],
  //           items: updatedItems,
  //           finalDeduction,
  //         },
  //       },
  //       { 'Content-Type': 'application/json' },
  //       true
  //     );

  //     if (!response.hasError) {
  //       setDeclaration((prev) => ({
  //         ...prev,
  //         [section]: {
  //           ...prev[section],
  //           items: updatedItems,
  //           finalDeduction,
  //         },
  //       }));
  //       toast.success(`${section} item status updated to ${status}`);
  //     } else {
  //       toast.error(response.message || 'Failed to update status');
  //     }
  //   } catch (error) {
  //     toast.error('Error updating status: ' + error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  //   const handleStatusChange = async (section, index, status) => {
  //   try {
  //     setIsSubmitting(true);

  //     // Prepare the update payload
  //     const updatePayload = {
  //       academicYear,
  //       updates: {
  //         section,
  //         index,
  //         status,
  //         proofSubmitted: declaration[section].items[index].proofSubmitted,
  //         adminRemarks: declaration[section].items[index].adminRemarks
  //       }
  //     };

  //     const response = await putAPI(
  //       `/it-declaration/update/${schoolId}/${declaration.employeeId}`,
  //       updatePayload,
  //       { 'Content-Type': 'application/json' },
  //       true
  //     );

  //     if (!response.hasError) {
  //       // Update local state with the response
  //       setDeclaration(prev => {
  //         const updated = JSON.parse(JSON.stringify(prev));

  //         // Update the specific item
  //         updated[section].items[index] = {
  //           ...updated[section].items[index],
  //           status,
  //           proofSubmitted: status === 'Rejected' ? 0 : updated[section].items[index].proofSubmitted,
  //           categoryFinalDeduction: status === 'Approved'
  //             ? section === 'section80D' || section === 'otherSections'
  //               ? Math.min(
  //                   updated[section].items[index].proofSubmitted,
  //                   updated[section].items[index].categoryLimit || Infinity
  //                 )
  //               : updated[section].items[index].proofSubmitted
  //             : 0
  //         };

  //         // Recalculate section totals
  //         const { finalDeduction } = calculateSectionTotals(section, updated[section].items);
  //         updated[section].finalDeduction = finalDeduction;

  //         return updated;
  //       });

  //       toast.success(`Status updated to ${status}`);
  //     } else {
  //       toast.error(response.message || 'Failed to update status');
  //     }
  //   } catch (error) {
  //     toast.error('Error updating status: ' + error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // In VerifySupportingSubmittedForTaxList.js
  const handleStatusChange = async (section, index, status) => {
    try {
      setIsSubmitting(true);

      let updatePayload;
      if (section === 'hraExemption') {
        // Fetch rent details to include in the payload
        const rentResponse = await getAPI(
          `/rent-details/${schoolId}/${declaration.employeeId}?academicYear=${academicYear}`,
          { 'Content-Type': 'application/json' },
          true
        );

        if (rentResponse.hasError || !rentResponse.data?.data) {
          throw new Error('Failed to fetch rent details');
        }

        const rentDetails = rentResponse.data.data.rentDetails.map((detail) => ({
          month: detail.month,
          declaredRent: detail.declaredRent || 0,
          cityType: detail.cityType || '',
          landlordName: detail.landlordName || '',
          landlordPanNumber: detail.landlordPanNumber || '',
          landlordAddress: detail.landlordAddress || '',
          rentReceipt: detail.rentReceipt || null,
          monthStatus: status, // Set all months to the new status
          adminRemarks: detail.adminRemarks || '',
        }));

        updatePayload = {
          academicYear,
          status,
          rentDetails,
        };
      } else {
        // Existing logic for section80C, section80D, otherSections
        updatePayload = {
          academicYear,
          updates: {
            section,
            index,
            status,
            proofSubmitted: declaration[section].items[index].proofSubmitted,
            adminRemarks: declaration[section].items[index].adminRemarks,
          },
        };
      }

      const response = await putAPI(
        section === 'hraExemption'
          ? `/rent-details/update/${schoolId}/${declaration.employeeId}`
          : `/it-declaration/update/${schoolId}/${declaration.employeeId}`,
        updatePayload,
        { 'Content-Type': 'application/json' },
        true
      );

      if (!response.hasError) {
        setDeclaration((prev) => {
          const updated = JSON.parse(JSON.stringify(prev));

          if (section === 'hraExemption') {
            updated.hraExemption = {
              ...updated.hraExemption,
              status,
              proofSubmitted: status === 'Approved' ? response.data.data.hraExemption : 0,
              rentDetails: response.data.data.rentDetails,
            };
          } else {
            updated[section].items[index] = {
              ...updated[section].items[index],
              status,
              proofSubmitted: status === 'Rejected' ? 0 : updated[section].items[index].proofSubmitted,
              categoryFinalDeduction:
                status === 'Approved'
                  ? section === 'section80D' || section === 'otherSections'
                    ? Math.min(
                      updated[section].items[index].proofSubmitted,
                      updated[section].items[index].categoryLimit || Infinity
                    )
                    : updated[section].items[index].proofSubmitted
                  : 0,
            };
            const { finalDeduction } = calculateSectionTotals(section, updated[section].items);
            updated[section].finalDeduction = finalDeduction;
          }

          return updated;
        });

        toast.success(`Status updated to ${status}`);
      } else {
        toast.error(response.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error('Error updating status: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  // const handleOtherExemptionStatusChange = async (exemptionType, status) => {
  //   try {
  //     setIsSubmitting(true);
  //     const updatedExemption = {
  //       ...declaration.otherExemption[exemptionType],
  //       status,
  //       proofSubmitted: status === 'Rejected' ? 0 : declaration.otherExemption[exemptionType].proofSubmitted,
  //       categoryFinalDeduction: status === 'Rejected' ? 0 : declaration.otherExemption[exemptionType].categoryFinalDeduction,
  //     };

  //     const response = await putAPI(
  //       `/it-declaration/update/${schoolId}/${declaration.employeeId}`,
  //       {
  //         academicYear,
  //         otherExemption: {
  //           ...declaration.otherExemption,
  //           [exemptionType]: updatedExemption,
  //         },
  //       },
  //       { 'Content-Type': 'application/json' },
  //       true
  //     );

  //     if (!response.hasError) {
  //       setDeclaration((prev) => ({
  //         ...prev,
  //         otherExemption: {
  //           ...prev.otherExemption,
  //           [exemptionType]: updatedExemption,
  //         },
  //       }));
  //       toast.success(`${exemptionType} status updated to ${status}`);
  //     } else {
  //       toast.error(response.message || 'Failed to update status');
  //     }
  //   } catch (error) {
  //     toast.error(`Error updating ${exemptionType} status: ` + error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  // In VerifySupportingSubmittedForTaxList.js
const handleOtherExemptionStatusChange = async (exemptionType, status) => {
  try {
    setIsSubmitting(true);

    let updatePayload;
    let apiEndpoint;

    if (exemptionType === 'ltaExemption') {
      const ltaResponse = await getAPI(
        `/get-lta-details/${schoolId}/${declaration.employeeId}?academicYear=${academicYear}`,
        { 'Content-Type': 'application/json' },
        true
      );

      if (ltaResponse.hasError || !ltaResponse.data?.data) {
        throw new Error('Failed to fetch LTA details');
      }

      const ltaDetails = ltaResponse.data.data.ltaDetails.map((detail) => ({
        _id: detail._id,
        NameOnBill: detail.NameOnBill,
        billNumber: detail.billNumber,
        billDate: detail.billDate,
        itemPurchased: detail.itemPurchased,
        vendorName: detail.vendorName,
        gstNumber: detail.gstNumber,
        grossAmount: detail.grossAmount,
        gstCharge: detail.gstCharge,
        totalAmount: detail.totalAmount,
        billFile: detail.billFile,
        billstatus: status,
        adminRemarks: detail.adminRemarks || '',
      }));

      updatePayload = {
        academicYear,
        status,
        ltaDetails,
      };
      apiEndpoint = `/update-lta/${schoolId}/${declaration.employeeId}`;
    } else if (exemptionType === 'telephoneAllowance') {
      const telephoneResponse = await getAPI(
        `/get-telephone-allowance/${schoolId}/${declaration.employeeId}?academicYear=${academicYear}`,
        { 'Content-Type': 'application/json' },
        true
      );

      if (telephoneResponse.hasError || !telephoneResponse.data?.data) {
        throw new Error('Failed to fetch telephone allowance details');
      }

      const telephoneAllowanceDetails = telephoneResponse.data.data.map((detail) => ({
        _id: detail._id,
        billNumber: detail.billNumber,
        billDate: detail.billDate,
        supplierName: detail.supplierName,
        gstNumber: detail.gstNumber,
        grossAmount: detail.grossAmount,
        billFile: detail.billFile,
        billStatus: status,
        adminRemarks: detail.adminRemarks || '',
      }));

      updatePayload = {
        academicYear,
        status,
        telephoneAllowanceDetails,
      };
      apiEndpoint = `/update-telephone-allowance/${schoolId}/${declaration.employeeId}`;
    } else if (exemptionType === 'internetAllowance') {
      const internetResponse = await getAPI(
        `/get-internet-allowance/${schoolId}/${declaration.employeeId}?academicYear=${academicYear}`,
        { 'Content-Type': 'application/json' },
        true
      );

      if (internetResponse.hasError || !internetResponse.data?.data) {
        throw new Error('Failed to fetch internet allowance details');
      }

      const internetAllowanceDetails = internetResponse.data.data.map((detail) => ({
        _id: detail._id,
        billNumber: detail.billNumber,
        billDate: detail.billDate,
        supplierName: detail.supplierName,
        gstNumber: detail.gstNumber,
        grossAmount: detail.grossAmount,
        billFile: detail.billFile,
        billStatus: status,
        adminRemarks: detail.adminRemarks || '',
      }));

      updatePayload = {
        academicYear,
        status,
        internetAllowanceDetails,
      };
      apiEndpoint = `/update-internet-allowance/${schoolId}/${declaration.employeeId}`;
    } else {
      throw new Error('Invalid exemption type');
    }

    const response = await putAPI(
      apiEndpoint,
      updatePayload,
      { 'Content-Type': 'application/json' },
      true
    );

    if (!response.hasError) {
      setDeclaration((prev) => ({
        ...prev,
        otherExemption: {
          ...prev.otherExemption,
          [exemptionType]: {
            ...prev.otherExemption[exemptionType],
            status,
            proofSubmitted: status === 'Approved' ? response.data.data.proofSubmitted : 0,
            categoryFinalDeduction: status === 'Approved' ? response.data.data.categoryFinalDeduction : 0,
          },
        },
      }));
      toast.success(`${exemptionType} status updated to ${status}`);
    } else {
      toast.error(response.message || 'Failed to update status');
    }
  } catch (error) {
    toast.error(`Error updating ${exemptionType} status: ` + error.message);
  } finally {
    setIsSubmitting(false);
  }
};
  const handleRemarkChange = (section, index, value) => {
    setDeclaration((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        items: prev[section].items.map((item, i) =>
          i === index ? { ...item, adminRemarks: value } : item
        ),
      },
    }));
  };

  const handleOtherExemptionRemarkChange = (exemptionType, value) => {
    setDeclaration((prev) => ({
      ...prev,
      otherExemption: {
        ...prev.otherExemption,
        [exemptionType]: {
          ...prev.otherExemption[exemptionType],
          adminRemarks: value,
        },
      },
    }));
  };

  const handleHraRemarkChange = (value) => {
    setDeclaration((prev) => ({
      ...prev,
      hraExemption: { ...prev.hraExemption, adminRemarks: value },
    }));
  };

  const handleDocumentPreview = (documentPath) => {
    if (documentPath) {
      const formattedPath = documentPath.startsWith('http')
        ? documentPath
        : `${process.env.REACT_APP_API_URL_FOR_IMAGE}/${documentPath}`;
      setPreviewDocument(formattedPath);
    } else {
      toast.error('No document available for preview');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await putAPI(
        `/it-declaration/update/${schoolId}/${declaration.employeeId}`,
        {
          academicYear,
          section80C: declaration.section80C,
          section80D: declaration.section80D,
          otherSections: declaration.otherSections,
          hraExemption: declaration.hraExemption,
          otherExemption: declaration.otherExemption,
          status: 'Verification Done',
        },
        { 'Content-Type': 'application/json' },
        true
      );

      if (!response.hasError) {
        toast.success('IT Declaration verified successfully');
        navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted');
      } else {
        toast.error(response.message || 'Failed to verify declaration');
      }
    } catch (error) {
      toast.error('Error verifying declaration: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigateToLtaDetails = () => {
    navigate(
      '/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/lta-list',
      {
        state: {
          employeeId: declaration.employeeId,
          academicYear,
        },
      }
    );
  };

  const handleNavigateToTelephoneDetails = () => {
    navigate(
      '/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/telephone-allowance-list',
      {
        state: {
          employeeId: declaration.employeeId,
          academicYear,
        },
      }
    );
  };

  const handleNavigateToInternetDetails = () => {
    navigate(
      '/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/internet-allowance-list',
      {
        state: {
          employeeId: declaration.employeeId,
          academicYear,
        },
      }
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount || 0);
  };

  const getFileName = (documentPath) => {
    if (documentPath) {
      const fullName = documentPath.split('\\').pop().split('/').pop() || 'Document';
      return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
    }
    return 'No file';
  };

  if (!declaration) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Supporting Submitted for Tax
                  </h4>
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() => navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted')}
                  >
                    Back
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row m-0 mb-2 pt-2 salary-slip-box">
                  <div className="col-md-8">
                    <p className="text-dark payroll-box-text">
                      <strong>Employee Name: </strong>{declaration.employeeName || 'N/A'}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="text-dark payroll-box-text">
                      <strong>Employee ID: </strong>{declaration.employeeId || 'N/A'}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="text-dark payroll-box-text">
                      <strong>Tax Regime: </strong>{declaration.taxRegime === 'new' ? 'New' : 'Old'}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="text-dark payroll-box-text">
                      <strong>PAN No: </strong>{declaration.panNumber || 'N/A'}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="text-dark">
                      {/* <label htmlFor="yearSelect" className="mb-0 payroll-box-text fw-bold">
                        Financial Year:
                      </label> */}
                      <strong>Financial Year: </strong>{academicYear || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="table-responsive mb-4">
                  <table className="table text-dark border border-dark mb-4">
                    <thead>
                      <tr className="payroll-table-header">
                        <th className="text-center align-content-center border border-dark p-2">Investment</th>
                        <th className="text-center align-content-center border border-dark p-2">Limit</th>
                        <th className="text-center align-content-center border border-dark p-2">Proof Submitted</th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "100px" }}>
                          Final Ded.
                        </th>
                        <th className="text-center align-content-center border border-dark p-2">Document</th>
                        <th className="text-center align-content-center border border-dark p-2">Action</th>
                        <th className="text-center align-content-center border border-dark p-2">Admin Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center border border-dark fw-bold p-2">Section 80C</td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(declaration.section80C.sectionLimit)}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(
                            declaration.section80C.items.reduce((sum, item) => sum + (item.status === 'Approved' ? item.proofSubmitted || 0 : 0), 0)
                          )}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(declaration.section80C.finalDeduction)}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                      </tr>
                      {declaration.section80C.items.map((item, index) => (
                        <tr key={`80C-${index}`} className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
                          <td className="text-end align-content-center border border-dark p-2"></td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.proofSubmitted)}
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.status === 'Approved' ? item.proofSubmitted : 0)}
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <button
                              type='button'
                              className="btn btn-light btn-sm"
                              onClick={() => handleDocumentPreview(item.proofDocument)}
                              disabled={!item.proofDocument}
                            >
                              <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                            </button>
                            <div className="mt-2">
                              <small>{getFileName(item.proofDocument)}</small>
                            </div>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                type='button'
                                className="btn btn-primary btn-sm"
                                onClick={() => handleStatusChange('section80C', index, 'Approved')}
                                disabled={item.status === 'Approved' || isSubmitting}
                              >
                                Accept
                              </button>
                              <button
                                type='button'
                                className="btn btn-danger btn-sm"
                                onClick={() => handleStatusChange('section80C', index, 'Rejected')}
                                disabled={item.status === 'Rejected' || isSubmitting}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              value={item.adminRemarks || ''}
                              onChange={(e) => handleRemarkChange('section80C', index, e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center border border-dark fw-bold p-2">Section 80D</td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(
                            declaration.section80D.items.reduce((sum, item) => sum + (item.status === 'Approved' ? item.proofSubmitted || 0 : 0), 0)
                          )}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(declaration.section80D.finalDeduction)}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                      </tr>
                      {declaration.section80D.items.map((item, index) => (
                        <tr key={`80D-${index}`} className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.categoryLimit)}
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.proofSubmitted)}
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.status === 'Approved' ? item.categoryFinalDeduction : 0)}
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <button
                              type='button'
                              className="btn btn-light btn-sm"
                              onClick={() => handleDocumentPreview(item.proofDocument)}
                              disabled={!item.proofDocument}
                            >
                              <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                            </button>
                            <div className="mt-2">
                              <small>{getFileName(item.proofDocument)}</small>
                            </div>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                type='button'
                                className="btn btn-primary btn-sm"
                                onClick={() => handleStatusChange('section80D', index, 'Approved')}
                                disabled={item.status === 'Approved' || isSubmitting}
                              >
                                Accept
                              </button>
                              <button
                                type='button'
                                className="btn btn-danger btn-sm"
                                onClick={() => handleStatusChange('section80D', index, 'Rejected')}
                                disabled={item.status === 'Rejected' || isSubmitting}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              value={item.adminRemarks || ''}
                              onChange={(e) => handleRemarkChange('section80D', index, e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center border border-dark fw-bold p-2">Other Sections</td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(
                            declaration.otherSections.items.reduce((sum, item) => sum + (item.status === 'Approved' ? item.proofSubmitted || 0 : 0), 0)
                          )}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(declaration.otherSections.finalDeduction)}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                      </tr>
                      {declaration.otherSections.items.map((item, index) => (
                        <tr key={`other-${index}`} className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.categoryLimit)}
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.proofSubmitted)}
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.status === 'Approved' ? item.categoryFinalDeduction : 0)}
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <button
                              type='button'
                              className="btn btn-light btn-sm"
                              onClick={() => handleDocumentPreview(item.proofDocument)}
                              disabled={!item.proofDocument}
                            >
                              <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                            </button>
                            <div className="mt-2">
                              <small>{getFileName(item.proofDocument)}</small>
                            </div>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                type='button'
                                className="btn btn-primary btn-sm"
                                onClick={() => handleStatusChange('otherSections', index, 'Approved')}
                                disabled={item.status === 'Approved' || isSubmitting}
                              >
                                Accept
                              </button>
                              <button
                                type='button'
                                className="btn btn-danger btn-sm"
                                onClick={() => handleStatusChange('otherSections', index, 'Rejected')}
                                disabled={item.status === 'Rejected' || isSubmitting}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              value={item.adminRemarks || ''}
                              onChange={(e) => handleRemarkChange('otherSections', index, e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center border border-dark fw-bold p-2">HRA Exemption</td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(declaration.hraExemption.proofSubmitted)}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(declaration.hraExemption.status === 'Approved' ? declaration.hraExemption.proofSubmitted : 0)}
                        </td>
                        <td className="text-center align-content-center border border-dark fw-bold p-2">
                          <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={() =>
                              navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/verify-rent-details', {
                                state: {
                                  rentDetailsId: declaration.hraExemption.rentDetailsId,
                                  rentDetails: declaration.hraExemption.rentDetails,
                                  employeeId: declaration.employeeId,
                                  academicYear
                                },
                              })
                            }
                            style={{
                              color: 'red',
                              fontWeight: 'bold',
                              fontSize: '1rem',
                            }}
                          >
                            Rent Details
                          </button>
                        </td>
                        {/* <td className="text-center align-content-center border border-dark p-2">
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              type='button'
                              className="btn btn-primary btn-sm"
                              onClick={() => handleStatusChange('hraExemption', 0, 'Approved')}
                              disabled={declaration.hraExemption.status === 'Approved' || isSubmitting}
                            >
                              Accept
                            </button>
                            <button
                              type='button'
                              className="btn btn-danger btn-sm"
                              onClick={() => handleStatusChange('hraExemption', 0, 'Rejected')}
                              disabled={declaration.hraExemption.status === 'Rejected' || isSubmitting}
                            >
                              Reject
                            </button>
                          </div>
                        </td> */}
                        <td className="text-center align-content-center border border-dark p-2">
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => handleStatusChange('hraExemption', null, 'Approved')}
                              disabled={declaration.hraExemption.status === 'Approved' || isSubmitting}
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => handleStatusChange('hraExemption', null, 'Rejected')}
                              disabled={declaration.hraExemption.status === 'Rejected' || isSubmitting}
                            >
                              Reject
                            </button>
                          </div>
                        </td>

                        <td className="text-end align-content-center border border-dark p-2">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-end"
                            value={declaration.hraExemption.adminRemarks || ''}
                            onChange={(e) => handleHraRemarkChange(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center border border-dark fw-bold p-2">Other Exemption</td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-center align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center border border-dark px-3 py-2">LTA Exemption</td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.ltaExemption?.categoryLimit)}
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.ltaExemption?.proofSubmitted)}
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.ltaExemption?.status === 'Approved' ? declaration.otherExemption.ltaExemption.categoryFinalDeduction : 0)}
                        </td>
                        <td className="text-center align-content-center border border-dark p-2">
                          <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={handleNavigateToLtaDetails}
                            style={{
                              color: "red",
                              fontWeight: "bold",
                              fontSize: "1rem"
                            }}
                          >
                            LTA Details
                          </button>
                        </td>
                        <td className="text-center align-content-center border border-dark p-2">
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              type='button'
                              className="btn btn-primary btn-sm"
                              onClick={() => handleOtherExemptionStatusChange('ltaExemption', 'Approved')}
                              disabled={declaration.otherExemption?.ltaExemption?.status === 'Approved' || isSubmitting}
                            >
                              Accept
                            </button>
                            <button
                              type='button'
                              className="btn btn-danger btn-sm"
                              onClick={() => handleOtherExemptionStatusChange('ltaExemption', 'Rejected')}
                              disabled={declaration.otherExemption?.ltaExemption?.status === 'Rejected' || isSubmitting}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-end"
                            value={declaration.otherExemption?.ltaExemption?.adminRemarks || ''}
                            onChange={(e) => handleOtherExemptionRemarkChange('ltaExemption', e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center border border-dark px-3 py-2">Telephone Allowance</td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.telephoneAllowance?.categoryLimit)}
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.telephoneAllowance?.proofSubmitted)}
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.telephoneAllowance?.status === 'Approved' ? declaration.otherExemption.telephoneAllowance.categoryFinalDeduction : 0)}
                        </td>
                        <td className="text-center align-content-center border border-dark p-2">
                          <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={handleNavigateToTelephoneDetails}
                            style={{
                              color: "red",
                              fontWeight: "bold",
                              fontSize: "1rem"
                            }}
                          >
                            Telephone Details
                          </button>
                        </td>
                        <td className="text-center align-content-center border border-dark p-2">
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              type='button'
                              className="btn btn-primary btn-sm"
                              onClick={() => handleOtherExemptionStatusChange('telephoneAllowance', 'Approved')}
                              disabled={declaration.otherExemption?.telephoneAllowance?.status === 'Approved' || isSubmitting}
                            >
                              Accept
                            </button>
                            <button
                              type='button'
                              className="btn btn-danger btn-sm"
                              onClick={() => handleOtherExemptionStatusChange('telephoneAllowance', 'Rejected')}
                              disabled={declaration.otherExemption?.telephoneAllowance?.status === 'Rejected' || isSubmitting}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-end"
                            value={declaration.otherExemption?.telephoneAllowance?.adminRemarks || ''}
                            onChange={(e) => handleOtherExemptionRemarkChange('telephoneAllowance', e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center border border-dark px-3 py-2">Internet Allowance</td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.internetAllowance?.categoryLimit)}
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.internetAllowance?.proofSubmitted)}
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.internetAllowance?.status === 'Approved' ? declaration.otherExemption.internetAllowance.categoryFinalDeduction : 0)}
                        </td>
                        <td className="text-center align-content-center border border-dark p-2">
                          <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={handleNavigateToInternetDetails}
                            style={{
                              color: "red",
                              fontWeight: "bold",
                              fontSize: "1rem"
                            }}
                          >
                            Internet Details
                          </button>
                        </td>
                        <td className="text-center align-content-center border border-dark p-2">
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              type='button'
                              className="btn btn-primary btn-sm"
                              onClick={() => handleOtherExemptionStatusChange('internetAllowance', 'Approved')}
                              disabled={declaration.otherExemption?.internetAllowance?.status === 'Approved' || isSubmitting}
                            >
                              Accept
                            </button>
                            <button
                              type='button'
                              className="btn btn-danger btn-sm"
                              onClick={() => handleOtherExemptionStatusChange('internetAllowance', 'Rejected')}
                              disabled={declaration.otherExemption?.internetAllowance?.status === 'Rejected' || isSubmitting}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-end"
                            value={declaration.otherExemption?.internetAllowance?.adminRemarks || ''}
                            onChange={(e) => handleOtherExemptionRemarkChange('internetAllowance', e.target.value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary custom-submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Verifying...' : 'Verified'}
                  </button>
                </div>
              </form>

              {previewDocument && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Document Preview</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setPreviewDocument(null)}
                        ></button>
                      </div>
                      <div className="modal-body">
                        {previewDocument.endsWith('.pdf') ? (
                          <iframe
                            src={`${previewDocument}#toolbar=0`}
                            style={{ width: '100%', height: '500px', border: 'none' }}
                            title="Document Preview"
                          ></iframe>
                        ) : (
                          <img
                            src={previewDocument}
                            alt="Document"
                            style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '10px' }}
                            onError={() => {
                              toast.error('Failed to load document');
                              setPreviewDocument(null);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default VerifySupportingSubmittedForTaxList;