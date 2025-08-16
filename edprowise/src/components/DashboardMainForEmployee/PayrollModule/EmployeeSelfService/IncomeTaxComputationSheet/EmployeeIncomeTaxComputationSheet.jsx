// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';

// const EmployeeIncomeTaxComputationSheet = () => {
//   const navigate = useNavigate();
//   const [schoolId, setSchoolId] = useState(null);
//   const [employeeId, setEmployeeId] = useState(null);
//   const [employeeDetails, setEmployeeDetails] = useState({});
//   const [academicYear, setAcademicYear] = useState('2025-26');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [ctcComponents, setCtcComponents] = useState([]);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     if (!userDetails?.schoolId || !userDetails?.userId) {
//       toast.error('Authentication details missing');
//       navigate('/login');
//       return;
//     }
//     setSchoolId(userDetails.schoolId);
//     setEmployeeId(userDetails.userId);

//     fetchEmployeeData(userDetails.schoolId, userDetails.userId);
//     // fetchCTCComponents(userDetails.schoolId);
//     fetchItComputationSheet(userDetails.schoolId, userDetails.userId);
//   }, [navigate]);

//   const fetchEmployeeData = async (schoolId, empId) => {
//     try {
//       const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
//       console.log("employeeRes", employeeRes);
//       if (!employeeRes.hasError && employeeRes.data?.data) {
//         setEmployeeDetails(employeeRes.data.data);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch employee details");
//     }
//   };

//   const fetchItComputationSheet = async (schoolId, empId) => {
//     try {
//       const computationRes = await getAPI(`/it-computation-sheet/${schoolId}/${empId}?academicYear=${academicYear}`);
//       if (!computationRes.hasError && computationRes.data?.data) {
//         const data = computationRes.data.data;

//       }
//     } catch (error) {
//       toast.error("Failed to fetch IT Computation Sheet");
//     }
//   };

//   return (
//     <div className="container-fluid" >
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2">
//                   <h4 className="payroll-title text-center mb-0">
//                     Income Tax (IT) Computation Sheet
//                   </h4>
//                 </div>
//               </div>
//               <div className="row m-0 salary-slip-box pt-2 my-2">
//                 <div className="col-md-8">
//                   <p className='text-dark payroll-box-text' >
//                     <strong>Employee Name : </strong> {employeeDetails.employeeName || 'N/A'}
//                   </p>
//                   {/* <p className='text-dark payroll-box-text'>
//                     <strong>Grade : </strong> {employeeDetails.grade || 'B'}
//                   </p> */}
//                 </div>

//                 <div className="col-md-4">
//                   <p className='text-dark payroll-box-text' >
//                     <strong>Employee ID : </strong> {employeeDetails.employeeId || 'N/A'}
//                   </p>

//                   {/* <p className='text-dark payroll-box-text'>
//                     <strong>Job Designation :</strong> {employeeDetails.jobDesignation || 'Teacher'}
//                   </p> */}
//                 </div>

//                 <div className="col-md-4">
//                   <p className='text-dark payroll-box-text'>
//                     <strong>Grade : </strong> {employeeDetails.grade || 'B'}
//                   </p>
//                 </div>

//                 <div className="col-md-4">
//                   <p className='text-dark payroll-box-text'>
//                     <strong>Job Designation :</strong> {employeeDetails.jobDesignation || 'Teacher'}
//                   </p>
//                 </div>

//                 <div className="col-md-4">
//                   <p className='text-dark payroll-box-text'>
//                     <strong>Tax Regime :</strong> {employeeDetails.taxRegime === "new" ? "New" : 'Old'}
//                   </p>
//                 </div>
//               </div>

//               <div className="table-responsive">
//                 <table className="table border border-dark text-dark mb-2">
//                   <thead>
//                     <tr className="payroll-table-header">
//                       <th className="text-center align-content-center border border-dark text-nowrap p-2">
//                         Particulars
//                       </th>
//                       <th className="text-center align-content-center border border-dark text-nowrap p-2">
//                         Previous Income
//                       </th>
//                       <th className="text-center align-content-center border border-dark text-nowrap p-2 " >
//                         Actual Salary
//                       </th>
//                       <th className="text-center align-content-center border border-dark text-nowrap p-2 " >
//                         Projection
//                       </th>
//                       <th className="text-center align-content-center border border-dark text-nowrap p-2" >
//                         Total
//                       </th>

//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr className='payroll-table-body' >
//                       <td className="align-content-center p-2 border border-dark" >
//                         No.of Months
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >
//                         3
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >
//                         9
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                     </tr>
//                     <tr className='payroll-table-body' >
//                       <td className="align-content-center p-2 border border-dark" >
//                         Basic Salary
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >
//                         1,00,000
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >
//                         9,00,000
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >
//                         10,00,000
//                       </td>
//                     </tr>
//                     <tr className='payroll-table-body' >
//                       <td className="align-content-center p-2 border border-dark" >
//                         HRA
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                     </tr>

//                     <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
//                       <td className="align-content-center fw-bold p-2 border border-dark" >
//                         Income from Salary
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" >
//                         10,00,000
//                       </td>
//                     </tr>

//                     <tr className='payroll-table-body' >
//                       <td className="align-content-center px-3 p-2 border border-dark" >
//                         Less: HRA Exemption
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >
//                         10,000
//                       </td>
//                     </tr>
//                     <tr className='payroll-table-body' >
//                       <td className="align-content-center px-3 p-2 border border-dark" style={{ border: "1px solid black" }}>
//                         Less: Standard Deduction
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" style={{ border: "1px solid black", }}>

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >
//                         75,000
//                       </td>
//                     </tr>
//                     <tr className='payroll-table-body' >
//                       <td className="align-content-center px-3 p-2 border border-dark" >
//                         Less: LTA Exemption
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                     </tr>
//                     <tr className='payroll-table-body' >
//                       <td className="align-content-center px-3 p-2 border border-dark" >
//                         Less: Professional Tax Exemption
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                     </tr>
//                     <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
//                       <td className="align-content-center fw-bold p-2 border border-dark" >
//                         Salary After Deduction Under Section 16
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" >

//                       </td>
//                     </tr>

//                     <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
//                       <td className="align-content-center fw-bold p-2 border border-dark" >
//                         Total Income
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" >

//                       </td>
//                     </tr>
//                     <tr className='payroll-table-body' >
//                       <td className="align-content-center px-3 p-2 border border-dark" >
//                         Less: Section 80C
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >
//                         1,50,000
//                       </td>
//                     </tr>
//                     <tr className='payroll-table-body' >
//                       <td className="align-content-center px-3 p-2 border border-dark" style={{ border: "1px solid black", }}>
//                         Less: Section 80D
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >
//                         20,000
//                       </td>
//                     </tr>
//                     <tr className='payroll-table-body' >
//                       <td className="align-content-center px-3 p-2 border border-dark" >
//                         Less: Other Section
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >
//                         45,000
//                       </td>
//                     </tr>

//                     <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
//                       <td className="align-content-center fw-bold p-2 border border-dark" >
//                         Net Taxable Income
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" style={{ border: "1px solid black", }}>

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" style={{ border: "1px solid black", }}>

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" style={{ border: "1px solid black", }}>
//                         7,00,000
//                       </td>
//                     </tr>
//                     <tr className='payroll-table-body' >
//                       <td className="align-content-center p-2 border border-dark" >
//                         Total Tax Incl Education Cess
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                     </tr>
//                     <tr className='payroll-table-body' >
//                       <td className="align-content-center p-2 border border-dark" >
//                         Rebate 87A (New Regime: If Net Taxable Income is upto 7 Lakhs, Old Regime: If Net Taxable Income is upto 5 Lakhs)
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                     </tr>
//                     <tr className='payroll-table-body' >
//                       <td className="align-content-center p-2 border border-dark" >
//                         Net Tax Payable
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                     </tr>
//                     <tr className='payroll-table-body' >
//                       <td className="align-content-center p-2 border border-dark" style={{ border: "1px solid black" }}>
//                         Tax already deducted
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" style={{ border: "1px solid black", }}>

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" style={{ border: "1px solid black", }}>

//                       </td>
//                       <td className="text-end align-content-center p-2 border border-dark" >

//                       </td>
//                     </tr>
//                     <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                       <td className="align-content-center fw-bold p-2 border border-dark" >
//                         Tax yet to be deducted
//                       </td>
//                       <td className="align-content-center text-end p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" style={{ border: "1px solid black", }}>

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" >

//                       </td>
//                       <td className="text-end align-content-center fw-bold p-2 border border-dark" >

//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )

// }
// export default EmployeeIncomeTaxComputationSheet;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';
// const EmployeeIncomeTaxComputationSheet = () => {
//   const navigate = useNavigate();
//   const [schoolId, setSchoolId] = useState(null);
//   const [employeeId, setEmployeeId] = useState(null);
//   const [employeeDetails, setEmployeeDetails] = useState({});
//   const [academicYear, setAcademicYear] = useState('2025-26');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [computationData, setComputationData] = useState(null);
//   const [hasPreviousIncome, setHasPreviousIncome] = useState(false);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     if (!userDetails?.schoolId || !userDetails?.userId) {
//       toast.error('Authentication details missing');
//       navigate('/login');
//       return;
//     }
//     setSchoolId(userDetails.schoolId);
//     setEmployeeId(userDetails.userId);

//     fetchEmployeeData(userDetails.schoolId, userDetails.userId);
//     fetchItComputationSheet(userDetails.schoolId, userDetails.userId);
//   }, [navigate]);

//   const fetchEmployeeData = async (schoolId, empId) => {
//     try {
//       const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
//       console.log("employeeRes", employeeRes);
//       if (!employeeRes.hasError && employeeRes.data?.data) {
//         setEmployeeDetails(employeeRes.data.data);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch employee details");
//     }
//   };

//   const fetchItComputationSheet = async (schoolId, empId) => {
//     try {
//       const computationRes = await getAPI(`/it-computation-sheet/${schoolId}/${empId}?academicYear=${academicYear}`);
//       console.log("computationRes", computationRes);
//       if (!computationRes.hasError && computationRes.data?.data) {
//         setComputationData(computationRes.data.data.computation);
//         setHasPreviousIncome(computationRes.data.data.hasPreviousIncome);
//         setEmployeeDetails(computationRes.data.data.employeeDetails);
//       } else {
//         toast.error("No IT computation data found");
//       }
//     } catch (error) {
//       console.error("Failed to fetch IT Computation Sheet:", error);
//       toast.error("Failed to fetch IT Computation Sheet");
//     }
//   };

//   const formatNumber = (value) => (value !== null && value !== undefined ? value.toLocaleString('en-IN') : '-');

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2">
//                   <h4 className="payroll-title text-center mb-0">
//                     Income Tax (IT) Computation Sheet
//                   </h4>
//                 </div>
//               </div>
//               <div className="row m-0 salary-slip-box pt-2 my-2">
//                 <div className="col-md-8">
//                   <p className='text-dark payroll-box-text' >
//                     <strong>Employee Name : </strong> {employeeDetails.employeeName || 'N/A'}
//                   </p>

//                 </div>

//                 <div className="col-md-4">
//                   <p className='text-dark payroll-box-text' >
//                     <strong>Employee ID : </strong> {employeeDetails.employeeId || 'N/A'}
//                   </p>


//                 </div>

//                 <div className="col-md-4">
//                   <p className='text-dark payroll-box-text'>
//                     <strong>Grade : </strong> {employeeDetails.grade || 'B'}
//                   </p>
//                 </div>

//                 <div className="col-md-4">
//                   <p className='text-dark payroll-box-text'>
//                     <strong>Job Designation :</strong> {employeeDetails.jobDesignation || 'Teacher'}
//                   </p>
//                 </div>

//                 <div className="col-md-4">
//                   <p className='text-dark payroll-box-text'>
//                     <strong>Tax Regime :</strong> {employeeDetails.taxRegime === "new" ? "New" : 'Old'}
//                   </p>
//                 </div>
//               </div>

//               <div className="table-responsive">
//                 <table className="table border border-dark text-dark mb-2">
//                   <thead>
//                     <tr className="payroll-table-header">
//                       <th className="text-center align-content-center border border-dark text-nowrap p-2">Particulars</th>
//                       {hasPreviousIncome && (
//                         <th className="text-center align-content-center border border-dark text-nowrap p-2">Previous Income</th>
//                       )}
//                       <th className="text-center align-content-center border border-dark text-nowrap p-2">Actual Salary</th>
//                       <th className="text-center align-content-center border border-dark text-nowrap p-2">Projection</th>
//                       <th className="text-center align-content-center border border-dark text-nowrap p-2">Total</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {computationData ? (
//                       <>
//                         <tr className="payroll-table-body">
//                           <td className="align-content-center p-2 border border-dark">No. of Months</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">
//                               {formatNumber(computationData.months.previousIncome)}
//                             </td>
//                           )}
//                           <td className="align-content-center text-end p-2 border border-dark">
//                             {formatNumber(computationData.months.actual)}
//                           </td>
//                           <td className="align-content-center text-end p-2 border border-dark">
//                             {formatNumber(computationData.months.projection)}
//                           </td>
//                           <td className="align-content-center text-end p-2 border border-dark">
//                             {formatNumber(computationData.months.total)}
//                           </td>
//                         </tr>
//                         {computationData.ctcComponents.map((comp, index) => (
//                           <tr key={index} className="payroll-table-body">
//                             <td className="align-content-center p-2 border border-dark">{comp.name}</td>
//                             {hasPreviousIncome && (
//                               <td className="align-content-center text-end p-2 border border-dark">
//                                 {formatNumber(comp.previousIncome)}
//                               </td>
//                             )}
//                             <td className="align-content-center text-end p-2 border border-dark">
//                               {formatNumber(comp.actual)}
//                             </td>
//                             <td className="align-content-center text-end p-2 border border-dark">
//                               {formatNumber(comp.projection)}
//                             </td>
//                             <td className="align-content-center text-end p-2 border border-dark">
//                               {formatNumber(comp.total)}
//                             </td>
//                           </tr>
//                         ))}
//                         <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                           <td className="align-content-center fw-bold p-2 border border-dark">Income from Salary</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">
//                               {formatNumber(computationData.incomeFromSalary.previousIncome)}
//                             </td>
//                           )}
//                           <td className="text-end align-content-center fw-bold p-2 border border-dark">
//                             {formatNumber(computationData.incomeFromSalary.actual)}
//                           </td>
//                           <td className="text-end align-content-center fw-bold p-2 border border-dark">
//                             {formatNumber(computationData.incomeFromSalary.projection)}
//                           </td>
//                           <td className="text-end align-content-center fw-bold p-2 border border-dark">
//                             {formatNumber(computationData.incomeFromSalary.total)}
//                           </td>
//                         </tr>
//                         <tr className="payroll-table-body">
//                           <td className="align-content-center px-3 p-2 border border-dark">Less: HRA Exemption</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">-</td>
//                           )}
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">
//                             {formatNumber(computationData.deductions.hraExemption.total)}
//                           </td>
//                         </tr>
//                         <tr className="payroll-table-body">
//                           <td className="align-content-center px-3 p-2 border border-dark">Less: Standard Deduction</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">-</td>
//                           )}
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">
//                             {formatNumber(computationData.deductions.standardDeduction.total)}
//                           </td>
//                         </tr>
//                         <tr className="payroll-table-body">
//                           <td className="align-content-center px-3 p-2 border border-dark">Less: LTA Exemption</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">-</td>
//                           )}
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">
//                             {formatNumber(computationData.deductions.ltaExemption.total)}
//                           </td>
//                         </tr>
//                         <tr className="payroll-table-body">
//                           <td className="align-content-center px-3 p-2 border border-dark">Less: Professional Tax Exemption</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">-</td>
//                           )}
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">
//                             {formatNumber(computationData.deductions.professionalTaxExemption.total)}
//                           </td>
//                         </tr>
//                         <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                           <td className="align-content-center fw-bold p-2 border border-dark">Salary After Deduction Under Section 16</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">-</td>
//                           )}
//                           <td className="text-end align-content-center fw-bold p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center fw-bold p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center fw-bold p-2 border border-dark">
//                             {/* {formatNumber(computationData.salaryAfterDeductions.total)} */} -
//                           </td>
//                         </tr>

//                         <tr className="payroll-table-body">
//                           <td className="align-content-center px-3 p-2 border border-dark">Less: Section 80C</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">-</td>
//                           )}
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">
//                             {formatNumber(computationData.deductions.section80C.total)}
//                           </td>
//                         </tr>
//                         <tr className="payroll-table-body">
//                           <td className="align-content-center px-3 p-2 border border-dark">Less: Section 80D</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">-</td>
//                           )}
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">
//                             {formatNumber(computationData.deductions.section80D.total)}
//                           </td>
//                         </tr>
//                         <tr className="payroll-table-body">
//                           <td className="align-content-center px-3 p-2 border border-dark">Less: Other Section</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">-</td>
//                           )}
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">
//                             {formatNumber(computationData.deductions.otherSection.total)}
//                           </td>
//                         </tr>
//                         <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                           <td className="align-content-center fw-bold p-2 border border-dark">Net Taxable Income</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">-</td>
//                           )}
//                           <td className="text-end align-content-center fw-bold p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center fw-bold p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center fw-bold p-2 border border-dark">
//                             {/* {formatNumber(computationData.netTaxableIncome.total)} */} -
//                           </td>
//                         </tr>
//                         <tr className="payroll-table-body">
//                           <td className="align-content-center p-2 border border-dark">Total Tax Incl Education Cess</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">-</td>
//                           )}
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">
//                             {formatNumber(computationData.totalTax.total)}
//                           </td>
//                         </tr>
//                         <tr className="payroll-table-body">
//                           <td className="align-content-center p-2 border border-dark">
//                             Rebate 87A (New Regime: If Net Taxable Income is up to 7 Lakhs, Old Regime: If Net Taxable Income is up to 5 Lakhs)
//                           </td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">-</td>
//                           )}
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">
//                             {formatNumber(computationData.rebate87A.total)}
//                           </td>
//                         </tr>
//                         <tr className="payroll-table-body">
//                           <td className="align-content-center p-2 border border-dark">Net Tax Payable</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">-</td>
//                           )}
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">
//                             {formatNumber(computationData.netTaxPayable.total)}
//                           </td>
//                         </tr>
//                         <tr className="payroll-table-body">
//                           <td className="align-content-center p-2 border border-dark">Tax already deducted</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">-</td>
//                           )}
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center p-2 border border-dark">
//                             {formatNumber(computationData.taxAlreadyDeducted.total)}
//                           </td>
//                         </tr>
//                         <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                           <td className="align-content-center fw-bold p-2 border border-dark">Tax yet to be deducted</td>
//                           {hasPreviousIncome && (
//                             <td className="align-content-center text-end p-2 border border-dark">-</td>
//                           )}
//                           <td className="text-end align-content-center fw-bold p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center fw-bold p-2 border border-dark">-</td>
//                           <td className="text-end align-content-center fw-bold p-2 border border-dark">
//                             {formatNumber(computationData.taxYetToBeDeducted.total)}
//                           </td>
//                         </tr>
//                       </>
//                     ) : (
//                       <tr>
//                         <td colSpan={hasPreviousIncome ? 5 : 4} className="text-center p-3">
//                           Loading...
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default EmployeeIncomeTaxComputationSheet;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
const EmployeeIncomeTaxComputationSheet = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [academicYear, setAcademicYear] = useState('2025-26');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [computationData, setComputationData] = useState(null);
  const [hasPreviousIncome, setHasPreviousIncome] = useState(false);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId || !userDetails?.userId) {
      toast.error('Authentication details missing');
      navigate('/login');
      return;
    }
    setSchoolId(userDetails.schoolId);
    setEmployeeId(userDetails.userId);

    fetchEmployeeData(userDetails.schoolId, userDetails.userId);
    fetchItComputationSheet(userDetails.schoolId, userDetails.userId);
  }, [navigate]);

  const fetchEmployeeData = async (schoolId, empId) => {
    try {
      const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
      console.log('employeeRes', employeeRes);
      if (!employeeRes.hasError && employeeRes.data?.data) {
        setEmployeeDetails(employeeRes.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch employee details');
    }
  };

  const fetchItComputationSheet = async (schoolId, empId) => {
    try {
      const computationRes = await getAPI(`/it-computation-sheet/${schoolId}/${empId}?academicYear=${academicYear}`);
      console.log('computationRes', computationRes);
      if (!computationRes.hasError && computationRes.data?.data) {
        setComputationData(computationRes.data.data.computation);
        setHasPreviousIncome(computationRes.data.data.hasPreviousIncome);
        setEmployeeDetails(computationRes.data.data.employeeDetails);
      } else {
        toast.error('No IT computation data found');
      }
    } catch (error) {
      console.error('Failed to fetch IT Computation Sheet:', error);
      toast.error('Failed to fetch IT Computation Sheet');
    }
  };

  const formatNumber = (value) => (value !== null && value !== undefined ? value.toLocaleString('en-IN') : '-');

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="payroll-title text-center mb-0">
                    Income Tax (IT) Computation Sheet
                  </h4>
                </div>
              </div>
              <div className="row m-0 salary-slip-box pt-2 my-2">
                <div className="col-md-8">
                  <p className="text-dark payroll-box-text">
                    <strong>Employee Name : </strong> {employeeDetails.employeeName || 'N/A'}
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="text-dark payroll-box-text">
                    <strong>Employee ID : </strong> {employeeDetails.employeeId || 'N/A'}
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="text-dark payroll-box-text">
                    <strong>Grade : </strong> {employeeDetails.grade || 'B'}
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="text-dark payroll-box-text">
                    <strong>Job Designation :</strong> {employeeDetails.jobDesignation || 'Teacher'}
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="text-dark payroll-box-text">
                    <strong>Tax Regime :</strong> {employeeDetails.taxRegime === 'new' ? 'New' : 'Old'}
                  </p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table border border-dark text-dark mb-2">
                  <thead>
                    <tr className="payroll-table-header">
                      <th className="text-center align-content-center border border-dark text-nowrap p-2">Particulars</th>
                      {hasPreviousIncome && (
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">Previous Income</th>
                      )}
                      <th className="text-center align-content-center border border-dark text-nowrap p-2">Actual Salary</th>
                      <th className="text-center align-content-center border border-dark text-nowrap p-2">Projection</th>
                      <th className="text-center align-content-center border border-dark text-nowrap p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {computationData ? (
                      <>
                        <tr className="payroll-table-body">
                          <td className="align-content-center p-2 border border-dark">No. of Months</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">
                              {formatNumber(computationData.months.previousIncome)}
                            </td>
                          )}
                          <td className="align-content-center text-end p-2 border border-dark">
                            {formatNumber(computationData.months.actual)}
                          </td>
                          <td className="align-content-center text-end p-2 border border-dark">
                            {formatNumber(computationData.months.projection)}
                          </td>
                          <td className="align-content-center text-end p-2 border border-dark">
                            {formatNumber(computationData.months.total)}
                          </td>
                        </tr>
                        {computationData.ctcComponents.map((comp, index) => (
                          <tr key={index} className="payroll-table-body">
                            <td className="align-content-center p-2 border border-dark">{comp.name}</td>
                            {hasPreviousIncome && (
                              <td className="align-content-center text-end p-2 border border-dark">
                                {formatNumber(comp.previousIncome)}
                              </td>
                            )}
                            <td className="align-content-center text-end p-2 border border-dark">
                              {formatNumber(comp.actual)}
                            </td>
                            <td className="align-content-center text-end p-2 border border-dark">
                              {formatNumber(comp.projection)}
                            </td>
                            <td className="align-content-center text-end p-2 border border-dark">
                              {formatNumber(comp.total)}
                            </td>
                          </tr>
                        ))}
                        {hasPreviousIncome && computationData.otherAllowances && (
                          <tr className="payroll-table-body">
                            <td className="align-content-center p-2 border border-dark">Other Allowances</td>
                            <td className="align-content-center text-end p-2 border border-dark">
                              {formatNumber(computationData.otherAllowances.previousIncome)}
                            </td>
                            <td className="align-content-center text-end p-2 border border-dark">
                              {formatNumber(computationData.otherAllowances.actual)}
                            </td>
                            <td className="align-content-center text-end p-2 border border-dark">
                              {formatNumber(computationData.otherAllowances.projection)}
                            </td>
                            <td className="align-content-center text-end p-2 border border-dark">
                              {formatNumber(computationData.otherAllowances.total)}
                            </td>
                          </tr>
                        )}
                        <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                          <td className="align-content-center fw-bold p-2 border border-dark">Income from Salary</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">
                              {formatNumber(computationData.incomeFromSalary.previousIncome)}
                            </td>
                          )}
                          <td className="text-end align-content-center fw-bold p-2 border border-dark">
                            {formatNumber(computationData.incomeFromSalary.actual)}
                          </td>
                          <td className="text-end align-content-center fw-bold p-2 border border-dark">
                            {formatNumber(computationData.incomeFromSalary.projection)}
                          </td>
                          <td className="text-end align-content-center fw-bold p-2 border border-dark">
                            {formatNumber(computationData.incomeFromSalary.total)}
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center px-3 p-2 border border-dark">Less: Standard Deduction</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">-</td>
                          )}
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">
                            {formatNumber(computationData.deductions.standardDeduction.total)}
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center px-3 p-2 border border-dark">Less: HRA Exemption</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">-</td>
                          )}
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">
                            {formatNumber(computationData.deductions.hraExemption.total)}
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center px-3 p-2 border border-dark">Less: LTA Exemption</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">-</td>
                          )}
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">
                            {formatNumber(computationData.deductions.ltaExemption.total)}
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center px-3 p-2 border border-dark">Less: Telephone Exemption</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">-</td>
                          )}
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">
                            {formatNumber(computationData.deductions.telephoneAllowance.total)}
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center px-3 p-2 border border-dark">Less: Internet Exemption</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">-</td>
                          )}
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">
                            {formatNumber(computationData.deductions.internetAllowance.total)}
                          </td>
                        </tr>


                        <tr className="payroll-table-body">
                          <td className="align-content-center px-3 p-2 border border-dark">Less: Professional Tax Exemption</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">
                              {formatNumber(computationData.deductions.professionalTaxExemption.previousIncome)}
                            </td>
                          )}
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">
                            {formatNumber(computationData.deductions.professionalTaxExemption.previousIncome)}
                          </td>
                        </tr>
                        <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                          <td className="align-content-center fw-bold p-2 border border-dark">Salary After Deduction Under Section 16</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">-</td>
                          )}
                          <td className="text-end align-content-center fw-bold p-2 border border-dark">-</td>
                          <td className="text-end align-content-center fw-bold p-2 border border-dark">-</td>
                          <td className="text-end align-content-center fw-bold p-2 border border-dark">
                            {formatNumber(computationData.salaryAfterDeductions.total)}
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center px-3 p-2 border border-dark">Less: Section 80C</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">
                              {formatNumber(computationData.deductions.section80C.previousIncome)}
                            </td>
                          )}
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">
                           {formatNumber(computationData.deductions.section80C.total)}
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center px-3 p-2 border border-dark">Less: Section 80D</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">-</td>
                          )}
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">
                            {formatNumber(computationData.deductions.section80D.total)}
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center px-3 p-2 border border-dark">Less: Other Section</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">-</td>
                          )}
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">
                            {formatNumber(computationData.deductions.otherSection.total)}
                          </td>
                        </tr>
                        <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                          <td className="align-content-center fw-bold p-2 border border-dark">Net Taxable Income</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">-</td>
                          )}
                          <td className="text-end align-content-center fw-bold p-2 border border-dark">-</td>
                          <td className="text-end align-content-center fw-bold p-2 border border-dark">-</td>
                          <td className="text-end align-content-center fw-bold p-2 border border-dark">
                            {formatNumber(computationData.netTaxableIncome.total)}
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center p-2 border border-dark">Total Tax Incl Education Cess</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">-</td>
                          )}
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">
                            {formatNumber(computationData.totalTax.total - computationData.deductions.section80C.previousIncome)}
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center p-2 border border-dark">
                            Rebate 87A (New Regime: If Net Taxable Income is up to 7 Lakhs, Old Regime: If Net Taxable Income is up to 5 Lakhs)
                          </td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">-</td>
                          )}
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">
                            {formatNumber(computationData.rebate87A.total)}
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center p-2 border border-dark">Net Tax Payable</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">-</td>
                          )}
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">
                            {formatNumber(computationData.netTaxPayable.total)}
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center p-2 border border-dark">Tax already deducted</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">-</td>
                          )}
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">-</td>
                          <td className="text-end align-content-center p-2 border border-dark">
                            {formatNumber(computationData.taxAlreadyDeducted.total)}
                          </td>
                        </tr>
                        <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                          <td className="align-content-center fw-bold p-2 border border-dark">Tax yet to be deducted</td>
                          {hasPreviousIncome && (
                            <td className="align-content-center text-end p-2 border border-dark">-</td>
                          )}
                          <td className="text-end align-content-center fw-bold p-2 border border-dark">-</td>
                          <td className="text-end align-content-center fw-bold p-2 border border-dark">-</td>
                          <td className="text-end align-content-center fw-bold p-2 border border-dark">
                            {formatNumber(computationData.taxYetToBeDeducted.total)}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td colSpan={hasPreviousIncome ? 5 : 4} className="text-center p-3">
                          Loading...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeeIncomeTaxComputationSheet;