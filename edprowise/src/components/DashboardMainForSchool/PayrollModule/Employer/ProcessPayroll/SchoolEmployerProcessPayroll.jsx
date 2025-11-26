// import React, { useState, useEffect } from 'react';
// import { toast } from "react-toastify";
// import moment from 'moment';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';
// const SchoolEmployerProcessPayroll = () => {
//   const [schoolId, setSchoolId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [year, setYear] = useState(moment().format('YYYY'));
//   const [month, setMonth] = useState(moment().format('MMMM'));
//   const [academicYear, setAcademicYear] = useState('2025-26');
//   const [payrollData, setPayrollData] = useState([]);
//   const [ctcComponents, setCtcComponents] = useState([]);
 
//   const currentYear = moment().year();
//   const years = Array.from({ length: currentYear - 2024 + 1 }, (_, i) => 2024 + i);
//   const months = moment.months();
//   const currentMonthIndex = moment().month();
//   const availableMonths = year === currentYear.toString() ? months.slice(0, currentMonthIndex + 1) : months;

//   const [pfEnabled, setPfEnabled] = useState(false);
//   const [esiEnabled, setEsiEnabled] = useState(false);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     if (!userDetails?.schoolId) {
//       toast.error("School ID not found. Please log in again.");
//       return;
//     }

//     setSchoolId(userDetails.schoolId);
//     fetchPfEsiSetting(userDetails.schoolId);
//     fetchPayrollAttendance(userDetails.schoolId);
//     fetchCTCComponents(userDetails.schoolId);
//   }, [year, month]);

//   const fetchPfEsiSetting = async (schoolId) => {
//     try {
//       const res = await getAPI(`/get-pf-esi-settings/${schoolId}?academicYear=${academicYear}`, {}, true);
//       if (res?.data) {
//         setPfEnabled(res.data.data.pfEnabled);
//         setEsiEnabled(res.data.data.esiEnabled);
//       }
//     } catch (err) {
//       console.error("Failed to fetch PF/ESI settings:", err);
//     }
//   };

//   const fetchCTCComponents = async (schoolId) => {
//     try {
//       const res = await getAPI(`/getall-payroll-ctc-component/${schoolId}?academicYear=${academicYear}`);
//       console.log("CTC get res",res);
      
//       if (!res.hasError && Array.isArray(res.data?.ctcComponent)) {
//         setCtcComponents(res.data.ctcComponent);
//       } else {
//         setCtcComponents([]);
//         toast.error("No CTC component data found.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch CTC components.");
//     }
//   };


//   const fetchPayrollAttendance = async (schoolId) => {

//     const monthIndex = String(moment().month(month).month() + 1).padStart(2, '0');
//     try {
//       setIsLoading(true);
//       const res = await getAPI(`/get-attendance-summary-info?schoolId=${schoolId}&year=${year}&month=${monthIndex}&academicYear=${academicYear}`);
//       console.log(res);

//       if (res?.data?.data) {
//         console.log("RES>DATA>DATA", res?.data?.data);
//         const transformedData = res.data.data.map(emp => ({
//           ...emp,
//           ctc: {
//             ...emp.ctc,
//             componentEarnings: emp.ctc.componentEarnings?.earnings || {},
//           },
//         }));

//         setPayrollData(res.data.data);
//       } else {
//         setPayrollData([]);
//         toast.error("No data received.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch payroll summary.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//    const handleSubmitForApproval = async (e) => {
//     e.preventDefault();
//     if (!payrollData.length) {
//       toast.error("No payroll data to submit.");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const payload = {
//         schoolId,
//         year,
//         month,
//         academicYear,
//         employees: payrollData.map(emp => ({
//           employeeId: emp.employeeId,
//           employeeName: emp.employeeName,
//           grade: emp.grade,
//           jobDesignation: emp.jobDesignation,
//           categoryOfEmployees: emp.categoryOfEmployees,
//           daysInMonth: emp.daysInMonth,
//           holiday: emp.holiday,
//           workingDays: emp.workingDays,
//           workedDays: emp.workedDays,
//           regularizedLeave: emp.regularizedLeave,
//           paidDays: emp.paidDays,
//           unpaidLeave: emp.unpaidLeave,
//           ctc: {
//             components: emp.ctc.components,
//             totalAnnualCost: emp.ctc.totalAnnualCost,
//             componentEarnings: { earnings: emp.ctc.componentEarnings }, // Wrap in earnings for Map
//           },
//           pfDeduction: emp.pfDeduction,
//           esiDeduction: emp.esiDeduction,
//           incomeTax: 0,
//           professionalTax: 0,
//           grossDeduction: 0,
//           netSalary: Math.floor(
//             Object.values(emp.ctc.componentEarnings).reduce((sum, val) => sum + val, 0) -
//             (emp.pfDeduction?.employeePFDeduction || 0) -
//             (emp.pfDeduction?.voluntaryPF || 0) -
//             (emp.esiDeduction?.employeeESIDeduction || 0)
//           ),
//         })),
//       };

//       console.log("Payload being sent:", JSON.stringify(payload, null, 2)); // Debug payload

//       const res = await postAPI('/save-payroll-approval', payload, {}, true);
//       if (!res.hasError) {
//         toast.success("Payroll data submitted for principal approval successfully");
//       } else {
//         toast.error(res.message || "Error submitting payroll data");
//       }
//     } catch (err) {
//       console.error("Error submitting payroll:", err);
//       toast.error("Failed to submit payroll data");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <>
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             <div className="card m-2">
//               <div className="card-body">
//                 <div className="container">
//                   <div className="card-header mb-2">
//                     <h4 className="card-title text-center">Payroll Process</h4>
//                   </div>
//                 </div>
//                 <form onSubmit={handleSubmitForApproval}>
//                 <div className="container">
//                   <div className="custom-bg d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
//                     <div className="d-flex flex-wrap align-items-center gap-3">
//                       <label className="mb-0 fw-bold">Year:</label>
//                       <select className="custom-select" value={year} onChange={(e) => setYear(e.target.value)}>
//                         {years.map((y) => (
//                           <option key={y} value={y}>{y}</option>
//                         ))}
//                       </select>

//                       <label className="mb-0 fw-bold">Month:</label>
//                       <select className="custom-select" value={month} onChange={(e) => setMonth(e.target.value)}>
//                         {availableMonths.map((m) => (
//                           <option key={m} value={m}>{m}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="table-responsive mb-4">
//                   <table className="table text-dark border border-secondary mb-4">
//                     <thead>
//                       <tr className="payroll-table-header">
//                         <th className="text-center border border-secondary p-2">Employee ID</th>
//                         <th className="text-center border border-secondary p-2">Employee Name</th>
//                         <th className="text-center border border-secondary p-2">Grade</th>
//                         <th className="text-center border border-secondary p-2">Designation</th>
//                         <th className="text-center border border-secondary p-2">Category</th>
//                         <th className="text-center border border-secondary p-2" style={{ width: "100px" }} >Days Month</th>
//                         <th className="text-center border border-secondary p-2">Holiday</th>
//                         <th className="text-center border border-secondary p-2">Working Days</th>
//                         <th className="text-center border border-secondary p-2">Worked Days</th>
//                         <th className="text-center border border-secondary p-2">Regularized Leave</th>
//                         <th className="text-center border border-secondary p-2">Paid Days</th>
//                         <th className="text-center border border-secondary p-2">Unpaid Leave</th>

//                         {ctcComponents.map((component) => (
//                           <th key={component._id} className="text-center border border-secondary p-2">
//                             {component.ctcComponentName}
//                           </th>
//                         ))}

//                         <th className="text-center border border-secondary p-2">Gross Earning</th>

//                         {pfEnabled && (
//                           <>
//                             <th className="text-center border border-secondary p-2">PF Deduction</th>
//                             <th className="text-center border border-secondary p-2">Voluntary PF Deduction</th>
//                           </>
//                         )}

//                         {esiEnabled && (
//                           <th className="text-center border border-secondary p-2">ESI Deduction</th>
//                         )}

//                         <th className="text-center border border-secondary p-2">Income Tax</th>
//                         <th className="text-center border border-secondary p-2">Professional Tax</th>
//                         <th className="text-center border border-secondary p-2">Gross Deduction</th>
//                         <th className="text-center border border-secondary p-2">Net Salary</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {payrollData.length > 0 ? (
//                         payrollData.map((emp, index) => (
//                           <tr key={index} className="payroll-table-body">
//                             <td className="text-center border border-secondary p-2">{emp.employeeId}</td>
//                             <td className="text-center border border-secondary p-2">{emp.employeeName || '-'}</td>
//                             <td className="text-center border border-secondary p-2">{emp.grade || '-'}</td>
//                             <td className="text-center border border-secondary p-2">{emp.jobDesignation || '-'}</td>
//                             <td className="text-center border border-secondary p-2">{emp.categoryOfEmployees || '-'}</td>
//                             <td className="text-center border border-secondary p-2">{emp.daysInMonth}</td>
//                             <td className="text-center border border-secondary p-2">{emp.holiday}</td>
//                             <td className="text-center border border-secondary p-2">{emp.workingDays}</td>
//                             <td className="text-center border border-secondary p-2">{emp.workedDays}</td>
//                             <td className="text-center border border-secondary p-2">{emp.regularizedLeave}</td>
//                             <td className="text-center border border-secondary p-2 fw-bold it-declaration-section-bg">{emp.paidDays}</td>
//                             <td className="text-center border border-secondary p-2">{emp.unpaidLeave}</td>



//                             {ctcComponents.map((component) => {
//                               const value = emp.ctc?.componentEarnings?.[component.ctcComponentName];
//                               return (
//                                 <td key={component._id} className="text-end border border-secondary p-2">
//                                   {value !== undefined ? value.toFixed(2) : "-"}
//                                 </td>
//                               );
//                             })}
//                             <td className="text-center border border-secondary p-2 fw-bold it-declaration-section-bg">
//                               {(() => {
//                                 const earnings = emp.ctc?.componentEarnings || {};
//                                 const gross = Object.values(earnings).reduce((sum, val) => sum + val, 0);
//                                 return Math.floor(gross);
//                               })()}
//                             </td>

//                             {pfEnabled && (
//                               <>
//                                 <td className="text-center border border-secondary p-2">{emp.pfDeduction?.employeePFDeduction || '0'}</td>
//                                 <td className="text-center border border-secondary p-2">{emp.pfDeduction?.voluntaryPF || '0'}</td>
//                               </>
//                             )}

//                             {esiEnabled && (
//                               <td className="text-center border border-secondary p-2">{emp.esiDeduction?.employeeESIDeduction || '0'}</td>
//                             )}
//                             <td className="text-center border border-secondary p-2"></td>
//                             <td className="text-center border border-secondary p-2"></td>

//                             <td className="text-center border border-secondary p-2">0</td>
//                             <td className="text-center border border-secondary p-2 fw-bold it-declaration-section-bg">0</td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="23" className="text-center p-3">
//                             {isLoading ? 'Loading...' : 'No payroll data available for selected month/year.'}
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>


//                 <div className="card-footer border-top" style={{ overflowX: "auto" }}>
//                   <div className="d-flex justify-content-end mt-3">
//                     <div className="mr-2">
//                       <button type="submit" className="btn btn-primary custom-submit-button" disabled={isLoading}>
//                           {isLoading ? 'Submitting...' : 'Submit for Principal Approval'}
//                         </button>
//                     </div>
//                     <div className="text" style={{ marginLeft: "1rem" }}>
//                       <button type="button" className="btn btn-primary custom-submit-button">
//                         Proceed for Payment
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default SchoolEmployerProcessPayroll;


import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import moment from 'moment';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
const SchoolEmployerProcessPayroll = () => {
  const [schoolId, setSchoolId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [year, setYear] = useState(moment().format('YYYY'));
  const [month, setMonth] = useState(moment().format('MMMM'));
  const [academicYear, setAcademicYear] = useState('');
  const [payrollData, setPayrollData] = useState([]);
  const [ctcComponents, setCtcComponents] = useState([]);

  const currentYear = moment().year();
  const years = Array.from({ length: currentYear - 2024 + 1 }, (_, i) => 2024 + i);
  const months = moment.months();
  const currentMonthIndex = moment().month();
  const availableMonths = year === currentYear.toString() ? months.slice(0, currentMonthIndex + 1) : months;

  const [pfEnabled, setPfEnabled] = useState(false);
  const [esiEnabled, setEsiEnabled] = useState(false);
  const [academicYearList, setAcademicYearList] = useState([]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (!userDetails?.schoolId) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    const academicYear = localStorage.getItem("selectedAcademicYear");
    setAcademicYear(academicYear);
    setSchoolId(userDetails.schoolId);
    fetchAcademicYears(userDetails.schoolId);
    fetchPfEsiSetting(userDetails.schoolId,academicYear);
    fetchPayrollAttendance(userDetails.schoolId,academicYear);
    fetchCTCComponents(userDetails.schoolId,academicYear);
  }, [year, month]);

   const fetchAcademicYears = async (schoolId) => {
          try {
            const response = await getAPI(`/get-payroll-academic-year/${schoolId}`);
            setAcademicYearList(response.data.data || []);
          } catch (err) {
            toast.error('Failed to fetch academic years.');
          }
        };
  

  const fetchPfEsiSetting = async (schoolId,academicYear) => {
    try {
      const res = await getAPI(`/get-pf-esi-settings/${schoolId}?academicYear=${academicYear}`, {}, true);
      if (res?.data) {
        setPfEnabled(res.data.data.pfEnabled);
        setEsiEnabled(res.data.data.esiEnabled);
      }
    } catch (err) {
      console.error("Failed to fetch PF/ESI settings:", err);
    }
  };
 
  const fetchCTCComponents = async (schoolId,academicYear) => {
    try {
      const res = await getAPI(`/getall-payroll-ctc-component/${schoolId}?academicYear=${academicYear}`);
      console.log("CTC get res", res);
      
      if (!res.hasError && Array.isArray(res.data?.ctcComponent)) {
        setCtcComponents(res.data.ctcComponent);
      } else {
        setCtcComponents([]);
        toast.error("No CTC component data found.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch CTC components.");
    }
  };

  const fetchPayrollAttendance = async (schoolId,academicYear) => {
    const monthIndex = String(moment().month(month).month() + 1).padStart(2, '0');
    try {
      setIsLoading(true);
      const res = await getAPI(`/get-attendance-summary-info?schoolId=${schoolId}&year=${year}&month=${monthIndex}&academicYear=${academicYear}`);
      console.log("Payroll response:", res);

      if (res?.data?.data) {
        console.log("RES>DATA>DATA", res.data.data);
        // Transform componentEarnings to flatten for frontend use
        const transformedData = res.data.data.map(emp => ({
          ...emp,
          ctc: {
            ...emp.ctc,
            componentEarnings: emp.ctc.componentEarnings?.earnings || {},
          },
        }));
        setPayrollData(transformedData);
      } else {
        setPayrollData([]);
        toast.error("No data received.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch payroll summary.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitForApproval = async (e) => {
    e.preventDefault();
    if (!payrollData.length) {
      toast.error("No payroll data to submit.");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        schoolId,
        year,
        month,
        academicYear,
        employees: payrollData.map(emp => ({
          employeeId: emp.employeeId,
          employeeName: emp.employeeName,
          grade: emp.grade,
          jobDesignation: emp.jobDesignation,
          categoryOfEmployees: emp.categoryOfEmployees,
          daysInMonth: emp.daysInMonth,
          holiday: emp.holiday,
          workingDays: emp.workingDays,
          workedDays: emp.workedDays,
          regularizedLeave: emp.regularizedLeave,
          paidDays: emp.paidDays,
          unpaidLeave: emp.unpaidLeave,
          ctc: {
            components: emp.ctc.components,
            totalAnnualCost: emp.ctc.totalAnnualCost,
            componentEarnings: { earnings: emp.ctc.componentEarnings }, // Wrap in earnings to match schema
          },
          pfDeduction: emp.pfDeduction,
          esiDeduction: emp.esiDeduction,
          incomeTax: 0,
          professionalTax: 0,
          grossDeduction: 0,
          netSalary: Math.floor(
            Object.values(emp.ctc.componentEarnings || {}).reduce((sum, val) => sum + val, 0) -
            (emp.pfDeduction?.employeePFDeduction || 0) -
            (emp.pfDeduction?.voluntaryPF || 0) -
            (emp.esiDeduction?.employeeESIDeduction || 0)
          ),
        })),
      };

      console.log("Payload being sent:", JSON.stringify(payload, null, 2)); // Debug payload

      const res = await postAPI('/save-payroll-approval', payload, {}, true);
      if (!res.hasError) {
        toast.success("Payroll data submitted for principal approval successfully");
      } else {
        toast.error(res.message || "Error submitting payroll data");
      }
    } catch (err) {
      console.error("Error submitting payroll:", err);
      toast.error("Failed to submit payroll data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card m-2">
              <div className="card-body">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center">Payroll Process</h4>
                  </div>
                </div>
                <form onSubmit={handleSubmitForApproval}>
                  <div className="container">
                    <div className="custom-bg d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
                      <div className="d-flex flex-wrap align-items-center gap-3">
                        <label className="mb-0 fw-bold">Year:</label>
                        <select className="custom-select" value={year} onChange={(e) => setYear(e.target.value)}>
                          {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>

                        <label className="mb-0 fw-bold">Month:</label>
                        <select className="custom-select" value={month} onChange={(e) => setMonth(e.target.value)}>
                          {availableMonths.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive mb-4">
                    <table className="table text-dark border border-secondary mb-4">
                      <thead>
                        <tr className="payroll-table-header">
                          <th className="text-center border border-secondary p-2">Employee ID</th>
                          <th className="text-center border border-secondary p-2">Employee Name</th>
                          <th className="text-center border border-secondary p-2">Grade</th>
                          <th className="text-center border border-secondary p-2">Designation</th>
                          <th className="text-center border border-secondary p-2">Category</th>
                          <th className="text-center border border-secondary p-2" style={{ width: "100px" }}>Days Month</th>
                          <th className="text-center border border-secondary p-2">Holiday</th>
                          <th className="text-center border border-secondary p-2">Working Days</th>
                          <th className="text-center border border-secondary p-2">Worked Days</th>
                          <th className="text-center border border-secondary p-2">Regularized Leave</th>
                          <th className="text-center border border-secondary p-2">Paid Days</th>
                          <th className="text-center border border-secondary p-2">Unpaid Leave</th>
                          {ctcComponents.map((component) => (
                            <th key={component._id} className="text-center border border-secondary p-2">
                              {component.ctcComponentName}
                            </th>
                          ))}
                          <th className="text-center border border-secondary p-2">Gross Earning</th>
                          {pfEnabled && (
                            <>
                              <th className="text-center border border-secondary p-2">PF Deduction</th>
                              <th className="text-center border border-secondary p-2">Voluntary PF Deduction</th>
                            </>
                          )}
                          {esiEnabled && (
                            <th className="text-center border border-secondary p-2">ESI Deduction</th>
                          )}
                          <th className="text-center border border-secondary p-2">Income Tax</th>
                          <th className="text-center border border-secondary p-2">Professional Tax</th>
                          <th className="text-center border border-secondary p-2">Gross Deduction</th>
                          <th className="text-center border border-secondary p-2">Net Salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payrollData.length > 0 ? (
                          payrollData.map((emp, index) => (
                            <tr key={index} className="payroll-table-body">
                              <td className="text-center border border-secondary p-2">{emp.employeeId}</td>
                              <td className="text-center border border-secondary p-2">{emp.employeeName || '-'}</td>
                              <td className="text-center border border-secondary p-2">{emp.grade || '-'}</td>
                              <td className="text-center border border-secondary p-2">{emp.jobDesignation || '-'}</td>
                              <td className="text-center border border-secondary p-2">{emp.categoryOfEmployees || '-'}</td>
                              <td className="text-center border border-secondary p-2">{emp.daysInMonth}</td>
                              <td className="text-center border border-secondary p-2">{emp.holiday}</td>
                              <td className="text-center border border-secondary p-2">{emp.workingDays}</td>
                              <td className="text-center border border-secondary p-2">{emp.workedDays}</td>
                              <td className="text-center border border-secondary p-2">{emp.regularizedLeave}</td>
                              <td className="text-center border border-secondary p-2 fw-bold it-declaration-section-bg">{emp.paidDays}</td>
                              <td className="text-center border border-secondary p-2">{emp.unpaidLeave}</td>
                              {ctcComponents.map((component) => {
                                const value = emp.ctc?.componentEarnings?.[component.ctcComponentName];
                                return (
                                  <td key={component._id} className="text-end border border-secondary p-2">
                                    {value !== undefined ? value.toFixed(2) : "-"}
                                  </td>
                                );
                              })}
                              <td className="text-center border border-secondary p-2 fw-bold it-declaration-section-bg">
                                {(() => {
                                  const earnings = emp.ctc?.componentEarnings || {};
                                  const gross = Object.values(earnings).reduce((sum, val) => sum + val, 0);
                                  return Math.floor(gross);
                                })()}
                              </td>
                              {pfEnabled && (
                                <>
                                  <td className="text-center border border-secondary p-2">{emp.pfDeduction?.employeePFDeduction || '0'}</td>
                                  <td className="text-center border border-secondary p-2">{emp.pfDeduction?.voluntaryPF || '0'}</td>
                                </>
                              )}
                              {esiEnabled && (
                                <td className="text-center border border-secondary p-2">{emp.esiDeduction?.employeeESIDeduction || '0'}</td>
                              )}
                              <td className="text-center border border-secondary p-2">0</td>
                              <td className="text-center border border-secondary p-2">0</td>
                              <td className="text-center border border-secondary p-2">0</td>
                              <td className="text-center border border-secondary p-2 fw-bold it-declaration-section-bg">
                                {Math.floor(
                                  Object.values(emp.ctc?.componentEarnings || {}).reduce((sum, val) => sum + val, 0) -
                                  (emp.pfDeduction?.employeePFDeduction || 0) -
                                  (emp.pfDeduction?.voluntaryPF || 0) -
                                  (emp.esiDeduction?.employeeESIDeduction || 0)
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={23 + ctcComponents.length} className="text-center p-3">
                              {isLoading ? 'Loading...' : 'No payroll data available for selected month/year.'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="card-footer border-top" style={{ overflowX: "auto" }}>
                    <div className="d-flex justify-content-end mt-3">
                      <div className="mr-2">
                        <button type="submit" className="btn btn-primary custom-submit-button" disabled={isLoading}>
                          {isLoading ? 'Submitting...' : 'Submit for Principal Approval'}
                        </button>
                      </div>
                      <div className="text" style={{ marginLeft: "1rem" }}>
                        <button type="button" className="btn btn-primary custom-submit-button">
                          Proceed for Payment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SchoolEmployerProcessPayroll;