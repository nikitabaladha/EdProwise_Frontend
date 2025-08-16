// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useNavigate, useLocation } from 'react-router-dom';
// import getAPI from "../../../../../../api/getAPI";
// import postAPI from "../../../../../../api/postAPI";

// const BulkEmployeeSalaryIncrement = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [schoolId, setSchoolId] = useState("");
//   const [academicYear, setAcademicYear] = useState("2025-26");
//   const [employeeId, setEmployeeId] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [employeeDetails, setEmployeeDetails] = useState(null);
//   const [ctcComponents, setCtcComponents] = useState([]);
//   const [componentAmounts, setComponentAmounts] = useState({});
//   const [annualCostToInstitution, setAnnualCostToInstitution] = useState(0);
//   const [incrementPercentage, setIncrementPercentage] = useState("");
//   const [applicableDate, setApplicableDate] = useState("");

//    useEffect(() => {
//       const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//       const id = userDetails?.schoolId;
//       if (!id) {
//         toast.error("School ID not found. Please log in again.");
//         return;
//       }
//       setSchoolId(id);

//         try {
//       const response = await getAPI(`/getAll-employee-ctc/${schoolId}/${academicYear}`);
//       if (!response.hasError && response.data?.data) {
//         setEmployeeDetails(response.data.data);
//         setShowForm(true);

//         const ctcRes = await getAPI(`/getall-payroll-ctc-component/${schoolId}`);
//         if (!ctcRes.hasError && Array.isArray(ctcRes.data?.ctcComponent)) {
//           setCtcComponents(ctcRes.data.ctcComponent);
//           const initialAmounts = {};
//           response.data.data.components.forEach((comp) => {
//             initialAmounts[comp.ctcComponentId] = parseFloat(comp.annualAmount.toFixed(2));
//           });
//           setComponentAmounts(initialAmounts);
//           setAnnualCostToInstitution(parseFloat(response.data.data.totalAnnualCost.toFixed(2)));
//         } else {
//           toast.error("CTC component data not found.");
//         }
//       } else {
//         setShowForm(false);
//         toast.error("No employee CTC data found.");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error occurred.");
//     }
//     }, []);

//      const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         if (!employeeDetails || !schoolId || ctcComponents.length === 0 || !applicableDate) {
//           toast.error("Incomplete form data. Please fill all required fields, including applicable date.");
//           return;
//         }
    
//         const formattedComponents = ctcComponents.map((component) => ({
//           ctcComponentId: component._id,
//           ctcComponentName: component.ctcComponentName,
//           annualAmount: componentAmounts[component._id] || 0,
//           applicableDate: new Date(applicableDate),
//         }));
    
//         try {
//           const payload = {
//             schoolId,
//             employeeId: employeeDetails.employeeId,
//             academicYear,
//             components: formattedComponents,
//             totalAnnualCost: annualCostToInstitution,
//             applicableDate: new Date(applicableDate),
//           };
    
//           const res = await postAPI("/increment-employee-ctc", payload, {}, true);
    
//           if (!res.hasError) {
//             toast.success("Increment submitted successfully for approval.");
//             navigate(-1);
//           } else {
//             toast.error(res.message || "Something went wrong.");
//           }
//         } catch (error) {
//           toast.error(error.response?.data?.message || "Submission failed.");
//         }
//       };
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2">
//                   <h4 className="card-title text-center">
//                     Employee Increment
//                   </h4>
//                 </div>
//               </div>
//               <form onSubmit="">
//                 <div className="table-responsive mb-4">
//                   <table className="table  text-dark mb-4" >
//                     <thead>
//                       <tr className="payroll-table-header">
//                         <th colSpan={5} className="text-center align-content-center text-nowrap p-2" style={{ borderBottom: "1px solid black", background:"snow" }} >

//                         </th>
//                         <th colSpan={2} className="text-center align-content-center text-nowrap p-2" style={{ borderBottom: "1px solid black" , background:"snow"}}>

//                         </th>
//                         <th colSpan={3} className="text-center border border-dark align-content-center text-nowrap p-2" >
//                           Salary Components (Old)
//                         </th>
//                         <th colSpan={3} className="text-center payroll-table-header border border-dark align-content-center text-nowrap p-2" >
//                           Salary Components (Revised)
//                         </th>
//                       </tr>
//                       <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                         <th className="text-center border border-dark align-content-center text-nowrap p-2" >
//                           Employee ID
//                         </th>
//                         <th className="text-center border border-dark align-content-center text-nowrap p-2" >
//                           Employee Name
//                         </th>
//                         <th className="text-center border border-dark align-content-center text-nowrap p-2" >
//                           Grade
//                         </th>
//                         <th className="text-center border border-dark align-content-center text-nowrap p-2" >
//                           Designation
//                         </th>
//                         <th className="text-center border border-dark align-content-center text-nowrap p-2" >
//                           Category
//                         </th>
//                         <th className="text-center border border-dark align-content-center text-nowrap p-2" >
//                           Increment %
//                         </th>
//                         <th className="text-center border border-dark align-content-center text-nowrap p-2" >
//                           Applicable From
//                         </th>
//                         <th className="text-center border border-dark align-content-center text-nowrap p-2" >
//                           Basic Salary
//                         </th>
//                         <th className="text-center border border-dark align-content-center text-nowrap p-2" >
//                           HRA
//                         </th>
//                         <th className="text-center border border-dark align-content-center text-nowrap p-2" >
//                           Gross Earning
//                         </th>
//                         <th className="text-center border border-dark align-content-center text-nowrap p-2" >
//                           Basic Salary
//                         </th>
//                         <th className="text-center border border-dark align-content-center text-nowrap p-2" >
//                           HRA
//                         </th>
//                         <th className="text-center border border-dark align-content-center text-nowrap p-2">
//                           Gross Earning
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr className='payroll-table-body' >
//                         <td className="text-start align-content-center border border-dark p-2" >
//                           Emp-001
//                         </td>
//                         <td className="text-start align-content-center border border-dark p-2" >
//                           Umesh Jadhav
//                         </td>
//                         <td className="text-start align-content-center border border-dark p-2" >
//                           A
//                         </td>
//                         <td className="text-start align-content-center border border-dark p-2" >
//                           Teacher
//                         </td>
//                         <td className="text-start align-content-center border border-dark p-2" >
//                           Teaching Staff
//                         </td>
//                         <td className="text-end align-content-center border border-dark p-2" >
//                           <input
//                             type="text"
//                             id="incrementPercentage"
//                             name="incrementPercentage"
//                             className="form-control payroll-table-body payroll-input-border"
//                             required
//                             placeholder='Enter Percentage'
//                           />
//                         </td>
//                         <td className="text-end align-content-center border border-dark p-2" >
//                           <input
//                             type="date"
//                             id="applicableFromDate"
//                             name="applicableFromDate"
//                             className="form-control payroll-table-body payroll-input-border"
//                             // value={formData.applicableFromDate}
//                             // onChange={handleChange}
//                             required
//                           />
//                         </td>
//                         <td className="text-end align-content-center border border-dark p-2" >

//                         </td>
//                         <td className="text-end align-content-center border border-dark p-2" >

//                         </td>
//                         <td className="text-end align-content-center border border-dark p-2" >

//                         </td>
//                         <td className="text-end align-content-center border border-dark p-2" >
                          
//                         </td>
//                         <td className="text-end align-content-center border border-dark p-2" >
                          
//                         </td>
//                         <td className="text-end align-content-center border border-dark p-2" >
                          
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>


//                 <div className="d-flex justify-content-end mt-3">
//                   <div className="mr-2">
//                     <button
//                       type="submit"
//                       className="btn btn-primary custom-submit-button"
//                     >
//                       Submit for Principal Approval
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BulkEmployeeSalaryIncrement

// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useNavigate, useLocation } from 'react-router-dom';
// import getAPI from "../../../../../../api/getAPI";
// import postAPI from "../../../../../../api/postAPI";

// const BulkEmployeeSalaryIncrement = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [schoolId, setSchoolId] = useState("");
//   const [academicYear, setAcademicYear] = useState("2025-26");
//   const [employeeList, setEmployeeList] = useState([]);
//   const [ctcComponents, setCtcComponents] = useState([]);
//   const [incrementData, setIncrementData] = useState({}); // { employeeId: { percentage, applicableDate, componentAmounts, totalAnnualCost } }
//   const [showForm, setShowForm] = useState(false);

//   // Set schoolId from localStorage
//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const id = userDetails?.schoolId;
//     if (!id) {
//       toast.error("School ID not found. Please log in again.");
//       return;
//     }
//     setSchoolId(id);
//   }, []);

//   // Fetch employee CTCs and CTC components
//   useEffect(() => {
//     if (!schoolId) return;

//     const fetchData = async () => {
//       try {
//         // Fetch all employees' CTC data
//         const response = await getAPI(`/getAll-employee-ctc/${schoolId}/${academicYear}`);
//         if (!response.hasError && Array.isArray(response.data?.data)) {
//           setEmployeeList(response.data.data);
//           setShowForm(true);

//           // Fetch CTC components
//           const ctcRes = await getAPI(`/getall-payroll-ctc-component/${schoolId}`);
//           if (!ctcRes.hasError && Array.isArray(ctcRes.data?.ctcComponent)) {
//             setCtcComponents(ctcRes.data.ctcComponent);

//             // Initialize incrementData for each employee
//             const initialIncrementData = {};
//             response.data.data.forEach((emp) => {
//               const componentAmounts = {};
//               emp.components.forEach((comp) => {
//                 componentAmounts[comp.ctcComponentId] = parseFloat(comp.annualAmount.toFixed(2));
//               });
//               initialIncrementData[emp.employeeId] = {
//                 percentage: "",
//                 applicableDate: "",
//                 componentAmounts,
//                 totalAnnualCost: parseFloat(emp.totalAnnualCost.toFixed(2)),
//               };
//             });
//             setIncrementData(initialIncrementData);
//           } else {
//             toast.error("CTC component data not found.");
//             setShowForm(false);
//           }
//         } else {
//           toast.error("No employee CTC data found.");
//           setShowForm(false);
//         }
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Error occurred.");
//         setShowForm(false);
//       }
//     };

//     fetchData();
//   }, [schoolId, academicYear]);

//   // Handle increment percentage change for an employee
//   const handleIncrementChange = (employeeId, percentage) => {
//     const parsedPercentage = Number(percentage) || 0;
//     setIncrementData((prev) => {
//       const empData = prev[employeeId] || {};
//       const componentAmounts = { ...empData.componentAmounts };
//       const emp = employeeList.find((e) => e.employeeId === employeeId);
//       if (!emp) return prev;

//       // Calculate revised amounts
//       ctcComponents.forEach((component) => {
//         const oldComp = emp.components.find((c) => c.ctcComponentId === component._id);
//         const oldAmount = oldComp ? oldComp.annualAmount : 0;
//         componentAmounts[component._id] = parseFloat((oldAmount * (1 + parsedPercentage / 100)).toFixed(2));
//       });

//       // Calculate total
//       const total = Object.values(componentAmounts).reduce((acc, val) => acc + val, 0);
//       return {
//         ...prev,
//         [employeeId]: {
//           ...empData,
//           percentage: parsedPercentage,
//           componentAmounts,
//           totalAnnualCost: parseFloat(total.toFixed(2)),
//         },
//       };
//     });
//   };

//   // Handle applicable date change
//   const handleApplicableDateChange = (employeeId, date) => {
//     setIncrementData((prev) => ({
//       ...prev,
//       [employeeId]: {
//         ...prev[employeeId],
//         applicableDate: date,
//       },
//     }));
//   };

//   // Handle manual component amount change
//   const handleComponentAmountChange = (employeeId, componentId, value) => {
//     const newAmount = Number(value) || 0;
//     setIncrementData((prev) => {
//       const empData = prev[employeeId] || {};
//       const componentAmounts = {
//         ...empData.componentAmounts,
//         [componentId]: parseFloat(newAmount.toFixed(2)),
//       };
//       const total = Object.values(componentAmounts).reduce((acc, val) => acc + val, 0);
//       return {
//         ...prev,
//         [employeeId]: {
//           ...empData,
//           componentAmounts,
//           totalAnnualCost: parseFloat(total.toFixed(2)),
//         },
//       };
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!employeeList.length || !schoolId || !ctcComponents.length) {
//       toast.error("No data available to submit.");
//       return;
//     }

//     try {
//       const payloads = employeeList
//         .filter((emp) => incrementData[emp.employeeId]?.percentage && incrementData[emp.employeeId]?.applicableDate)
//         .map((emp) => {
//           const empData = incrementData[emp.employeeId];
//           const formattedComponents = ctcComponents.map((component) => ({
//             ctcComponentId: component._id,
//             ctcComponentName: component.ctcComponentName,
//             annualAmount: empData.componentAmounts[component._id] || 0,
//             applicableDate: new Date(empData.applicableDate),
//           }));

//           return {
//             schoolId,
//             employeeId: emp.employeeId,
//             academicYear,
//             components: formattedComponents,
//             totalAnnualCost: empData.totalAnnualCost,
//             applicableDate: new Date(empData.applicableDate),
//           };
//         });

//       if (!payloads.length) {
//         toast.error("No employees have valid increment data (percentage and applicable date required).");
//         return;
//       }

//       // Send bulk requests
//       const responses = await Promise.all(
//         payloads.map((payload) => postAPI("/create-update-employee-ctc", payload, {}, true))
//       );

//       const hasError = responses.some((res) => res.hasError);
//       if (!hasError) {
//         toast.success("Increments submitted successfully for approval.");
//         navigate(-1);
//       } else {
//         toast.error("Some submissions failed: " + responses.find((res) => res.hasError)?.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Submission failed.");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2 border border-0">
//                   <h4 className="card-title text-center">
//                     Bulk Employee Increment
//                   </h4>
//                 </div>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 {showForm && (
//                   <div className="table-responsive mb-4">
//                     <table className="table text-dark mb-4">
//                       <thead>
//                         <tr className="payroll-table-header">
//                           <th colSpan={5} className="text-center align-content-center p-2" style={{ borderBottom: "1px solid black", background: "snow",  }}></th>
//                           <th colSpan={2} className="text-center align-content-center p-2" style={{ borderBottom: "1px solid black", background: "snow",  }}></th>
//                           <th colSpan={ctcComponents.length + 1} className="text-center border border-dark align-content-center p-2" >
//                             Salary Components (Old)
//                           </th>
//                           <th colSpan={ctcComponents.length + 1} className="text-center payroll-table-header border border-dark align-content-center p-2" >
//                             Salary Components (Revised)
//                           </th>
//                         </tr>
//                         <tr className="it-declaration-section-bg payroll-box-text fw-bold">
//                           <th className="text-center border border-dark align-content-center p-2" >Employee ID</th>
//                           <th className="text-center border border-dark align-content-center p-2" >Employee Name</th>
//                           <th className="text-center border border-dark align-content-center p-2" >Grade</th>
//                           <th className="text-center border border-dark align-content-center p-2" >Designation</th>
//                           <th className="text-center border border-dark align-content-center p-2" >Category</th>
//                           <th className="text-center border border-dark align-content-center p-2" >Increment %</th>
//                           <th className="text-center border border-dark align-content-center p-2" >Applicable From</th>
//                           {ctcComponents.map((component) => (
//                             <th key={`old-${component._id}`} className="text-center border border-dark align-content-center p-2" >
//                               {component.ctcComponentName}
//                             </th>
//                           ))}
//                           <th className="text-center border border-dark align-content-center p-2" >Gross Earning</th>
//                           {ctcComponents.map((component) => (
//                             <th key={`revised-${component._id}`} className="text-center border border-dark align-content-center p-2" >
//                               {component.ctcComponentName}
//                             </th>
//                           ))}
//                           <th className="text-center border border-dark align-content-center p-2" >Gross Earning</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {employeeList.map((emp) => (
//                           <tr className="payroll-table-body" key={emp.employeeId}>
//                             <td className="text-start align-content-center border border-dark p-2">{emp.employeeId}</td>
//                             <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.employeeName}</td>
//                             <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.grade}</td>
//                             <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.jobDesignation}</td>
//                             <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.categoryOfEmployees}</td>
//                             <td className="text-end align-content-center border border-dark p-2">
//                               <input
//                                 type="number"
//                                 className="form-control payroll-table-body payroll-input-border"
//                                 value={incrementData[emp.employeeId]?.percentage || ""}
//                                 onChange={(e) => handleIncrementChange(emp.employeeId, e.target.value)}
//                                 placeholder="Enter Percentage"
//                                 min="0"
//                                 step="0.01"
//                               />
//                             </td>
//                             <td className="text-end align-content-center border border-dark p-2">
//                               <input
//                                 type="date"
//                                 className="form-control payroll-table-body payroll-input-border"
//                                 value={incrementData[emp.employeeId]?.applicableDate || ""}
//                                 onChange={(e) => handleApplicableDateChange(emp.employeeId, e.target.value)}
//                                 required
//                               />
//                             </td>
//                             {ctcComponents.map((component) => (
//                               <td key={`old-${component._id}`} className="text-end align-content-center border border-dark p-2">
//                                 {emp.components.find((c) => c.ctcComponentId === component._id)?.annualAmount.toFixed(2) || "-"}
//                               </td>
//                             ))}
//                             <td className="text-end align-content-center border border-dark p-2">
//                               {emp.totalAnnualCost.toFixed(2)}
//                             </td>
//                             {ctcComponents.map((component) => (
//                               <td key={`revised-${component._id}`} className="text-end align-content-center border border-dark p-2">
//                                 <input
//                                   type="number"
//                                   className="form-control payroll-table-body payroll-input-border text-end"
//                                   value={incrementData[emp.employeeId]?.componentAmounts[component._id] || ""}
//                                   onChange={(e) => handleComponentAmountChange(emp.employeeId, component._id, e.target.value)}
//                                   step="0.01"
//                                 />
//                               </td>
//                             ))}
//                             <td className="text-end align-content-center border border-dark p-2">
//                               {incrementData[emp.employeeId]?.totalAnnualCost.toFixed(2) || "-"}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//                 <div className="d-flex justify-content-end mt-3">
//                   <button
//                     type="submit"
//                     className="btn btn-primary custom-submit-button"
//                     disabled={!showForm}
//                   >
//                     Submit for Principal Approval
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BulkEmployeeSalaryIncrement;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from 'react-router-dom';
import getAPI from "../../../../../../api/getAPI";
import postAPI from "../../../../../../api/postAPI";

const BulkEmployeeSalaryIncrement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [schoolId, setSchoolId] = useState("");
  const [academicYear, setAcademicYear] = useState("2025-26");
  const [employeeList, setEmployeeList] = useState([]);
  const [ctcComponents, setCtcComponents] = useState([]);
  const [incrementData, setIncrementData] = useState({}); // { employeeId: { percentage, applicableDate, componentAmounts, totalAnnualCost } }
  const [showForm, setShowForm] = useState(false);

  // Set schoolId from localStorage
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
  }, []);

  // Fetch employee CTCs and CTC components
  useEffect(() => {
    if (!schoolId) return;

    const fetchData = async () => {
      try {
        // Fetch all employees' CTC data
        const response = await getAPI(`/getAll-employee-ctc/${schoolId}/${academicYear}`);
        if (!response.hasError && Array.isArray(response.data?.data)) {
          setEmployeeList(response.data.data);
          setShowForm(true);

          // Fetch CTC components
          const ctcRes = await getAPI(`/getall-payroll-ctc-component/${schoolId}`);
          if (!ctcRes.hasError && Array.isArray(ctcRes.data?.ctcComponent)) {
            let components = ctcRes.data.ctcComponent;

        // Sort: Basic Salary first, HRA second, then all others
        components = components.sort((a, b) => {
          const priority = { "Basic Salary": 1, "HRA": 2 };
          const aPriority = priority[a.ctcComponentName] || 99;
          const bPriority = priority[b.ctcComponentName] || 99;
          if (aPriority !== bPriority) return aPriority - bPriority;
          return a.ctcComponentName.localeCompare(b.ctcComponentName);
        });

        setCtcComponents(components);
            // Initialize incrementData for each employee
            const initialIncrementData = {};
            response.data.data.forEach((emp) => {
              const componentAmounts = {};
              emp.components.forEach((comp) => {
                componentAmounts[comp.ctcComponentId] = parseFloat(comp.annualAmount.toFixed(2));
              });
              initialIncrementData[emp.employeeId] = {
                percentage: "",
                applicableDate: "",
                componentAmounts,
                totalAnnualCost: parseFloat(emp.totalAnnualCost.toFixed(2)),
              };
            });
            setIncrementData(initialIncrementData);
          } else {
            toast.error("CTC component data not found.");
            setShowForm(false);
          }
        } else {
          toast.error("No employee CTC data found.");
          setShowForm(false);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error occurred.");
        setShowForm(false);
      }
    };

    fetchData();
  }, [schoolId, academicYear]);

  // Handle increment percentage change for an employee
  const handleIncrementChange = (employeeId, percentage) => {
    const parsedPercentage = Number(percentage) || 0;
    setIncrementData((prev) => {
      const empData = prev[employeeId] || {};
      const componentAmounts = { ...empData.componentAmounts };
      const emp = employeeList.find((e) => e.employeeId === employeeId);
      if (!emp) return prev;

      // Calculate revised amounts
      ctcComponents.forEach((component) => {
        const oldComp = emp.components.find((c) => c.ctcComponentId === component._id);
        const oldAmount = oldComp ? oldComp.annualAmount : 0;
        componentAmounts[component._id] = parseFloat((oldAmount * (1 + parsedPercentage / 100)).toFixed(2));
      });

      // Calculate total
      const total = Object.values(componentAmounts).reduce((acc, val) => acc + val, 0);
      return {
        ...prev,
        [employeeId]: {
          ...empData,
          percentage: parsedPercentage,
          componentAmounts,
          totalAnnualCost: parseFloat(total.toFixed(2)),
        },
      };
    });
  };

  // Handle applicable date change
  const handleApplicableDateChange = (employeeId, date) => {
    setIncrementData((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        applicableDate: date,
      },
    }));
  };

  // Handle manual component amount change
  const handleComponentAmountChange = (employeeId, componentId, value) => {
    const newAmount = Number(value) || 0;
    setIncrementData((prev) => {
      const empData = prev[employeeId] || {};
      const componentAmounts = {
        ...empData.componentAmounts,
        [componentId]: parseFloat(newAmount.toFixed(2)),
      };
      const total = Object.values(componentAmounts).reduce((acc, val) => acc + val, 0);
      return {
        ...prev,
        [employeeId]: {
          ...empData,
          componentAmounts,
          totalAnnualCost: parseFloat(total.toFixed(2)),
        },
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeList.length || !schoolId || !ctcComponents.length) {
      toast.error("No data available to submit.");
      return;
    }

    try {
      const payloads = employeeList
        .filter((emp) => incrementData[emp.employeeId]?.percentage && incrementData[emp.employeeId]?.applicableDate)
        .map((emp) => {
          const empData = incrementData[emp.employeeId];
          const formattedComponents = ctcComponents.map((component) => ({
            ctcComponentId: component._id,
            ctcComponentName: component.ctcComponentName,
            annualAmount: empData.componentAmounts[component._id] || 0,
            applicableDate: new Date(empData.applicableDate),
          }));

          return {
            schoolId,
            employeeId: emp.employeeId,
            academicYear,
            components: formattedComponents,
            totalAnnualCost: empData.totalAnnualCost,
            applicableDate: new Date(empData.applicableDate),
          };
        });

      if (!payloads.length) {
        toast.error("No employees have valid increment data (percentage and applicable date required).");
        return;
      }

      // Send bulk requests
      const responses = await Promise.all(
        payloads.map((payload) => postAPI("/increment-employee-ctc", payload, {}, true))
      );

      const hasError = responses.some((res) => res.hasError);
      if (!hasError) {
        toast.success("Increments submitted successfully for approval.");
        navigate(-1);
      } else {
        toast.error("Some submissions failed: " + responses.find((res) => res.hasError)?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 border border-0">
                  <h4 className="card-title text-center">
                    Bulk Employee Increment
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                {showForm && (
                  <div className="table-responsive mb-4">
                    <table className="table text-dark mb-4" style={{ minWidth: "1400px" }}>
                      <thead>
                        <tr className="payroll-table-header">
                          <th colSpan={5} className="text-center align-content-center p-2" style={{ borderBottom: "1px solid black", background: "snow" }}></th>
                          <th colSpan={2} className="text-center align-content-center p-2" style={{ borderBottom: "1px solid black", background: "snow" }}></th>
                          <th colSpan={ctcComponents.length + 1} className="text-center border border-dark align-content-center p-2">
                            Salary Components (Old)
                          </th>
                          <th colSpan={ctcComponents.length + 1} className="text-center payroll-table-header border border-dark align-content-center p-2">
                            Salary Components (Revised)
                          </th>
                        </tr>
                        <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                          <th className="text-center border border-dark align-content-center p-2" style={{ width: "100px" }}>Employee ID</th>
                          <th className="text-center border border-dark align-content-center p-2" style={{ width: "200px" }}>Employee Name</th>
                          <th className="text-center border border-dark align-content-center p-2" style={{ width: "80px" }}>Grade</th>
                          <th className="text-center border border-dark align-content-center p-2" style={{ width: "150px" }}>Designation</th>
                          <th className="text-center border border-dark align-content-center p-2" style={{ width: "150px" }}>Category</th>
                          <th className="text-center border border-dark align-content-center p-2" style={{ width: "120px" }}>Increment %</th>
                          <th className="text-center border border-dark align-content-center p-2" style={{ width: "150px" }}>Applicable From</th>
                          {ctcComponents.map((component) => (
                            <th key={`old-${component._id}`} className="text-center border border-dark align-content-center p-2" style={{ width: "160px" }}>
                              {component.ctcComponentName}
                            </th>
                          ))}
                          <th className="text-center border border-dark align-content-center p-2" style={{ width: "140px" }}>Gross Earning</th>
                          {ctcComponents.map((component) => (
                            <th key={`revised-${component._id}`} className="text-center border border-dark align-content-center p-2" style={{ width: "800px" }}>
                              {component.ctcComponentName}
                            </th>
                          ))}
                          <th className="text-center border border-dark align-content-center p-2" style={{ width: "140px" }}>Gross Earning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeeList.map((emp) => (
                          <tr className="payroll-table-body" key={emp.employeeId}>
                            <td className="text-start align-content-center border border-dark p-2">{emp.employeeId}</td>
                            <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.employeeName}</td>
                            <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.grade}</td>
                            <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.jobDesignation}</td>
                            <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.categoryOfEmployees}</td>
                            <td className="text-end align-content-center border border-dark p-2">
                              <input
                                type="number"
                                className="form-control payroll-table-body payroll-input-border text-end"
                                style={{ padding: "4px 8px", fontSize: "14px" }}
                                value={incrementData[emp.employeeId]?.percentage || ""}
                                onChange={(e) => handleIncrementChange(emp.employeeId, e.target.value)}
                                placeholder="Enter %"
                                min="0"
                                step="0.01"
                              />
                            </td>
                            <td className="text-end align-content-center border border-dark p-2">
                              <input
                                type="date"
                                className="form-control payroll-table-body payroll-input-border"
                                style={{ padding: "4px 8px", fontSize: "14px" }}
                                value={incrementData[emp.employeeId]?.applicableDate || ""}
                                onChange={(e) => handleApplicableDateChange(emp.employeeId, e.target.value)}
                                
                              />
                            </td>
                            {ctcComponents.map((component) => (
                              <td key={`old-${component._id}`} className="text-end align-content-center border border-dark p-2">
                                {emp.components.find((c) => c.ctcComponentId === component._id)?.annualAmount.toFixed(2) || "-"}
                              </td>
                            ))}
                            <td className="text-end align-content-center border border-dark p-2">
                              {emp.totalAnnualCost.toFixed(2)}
                            </td>
                            {ctcComponents.map((component) => (
                              <td key={`revised-${component._id}`} className="text-end align-content-center border border-dark p-2">
                                <input
                                  type="number"
                                  className="form-control payroll-table-body payroll-input-border text-end"
                                  style={{ padding: "4px 8px", fontSize: "14px", width: "100%", boxSizing: "border-box" }}
                                  value={incrementData[emp.employeeId]?.componentAmounts[component._id] || ""}
                                  onChange={(e) => handleComponentAmountChange(emp.employeeId, component._id, e.target.value)}
                                  step="0.01"
                                />
                              </td>
                            ))}
                            <td className="text-end align-content-center border border-dark p-2">
                              {incrementData[emp.employeeId]?.totalAnnualCost.toFixed(2) || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="d-flex justify-content-end mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                    disabled={!showForm}
                  >
                    Submit for Principal Approval
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkEmployeeSalaryIncrement;