// import React, { useState, useEffect } from 'react';
// import { MdOutlineAutorenew } from "react-icons/md";
// import getAPI from "../../../../../api/getAPI";
// import postAPI from '../../../../../api/postAPI';
// import { toast } from "react-toastify";
// import moment from "moment";

// const EmployeeProvidentFund = () => {
//     const [academicYear, setAcademicYear] = useState("2025-26");
//     const [schoolId, setSchoolId] = useState("");
//     const [employeeId, setEmployeeId] = useState("");
//     const [months, setMonths] = useState([]);
//     const [pfData, setPfData] = useState({});
//     const [savedMonths, setSavedMonths] = useState([]);
//     // Fetch user details
//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//         const id = userDetails?.schoolId;
//         const empid = userDetails?.userId;

//         if (!id || !empid) {
//             toast.error("User details not found. Please login again.");
//             return;
//         }

//         setSchoolId(id);
//         setEmployeeId(empid);
//     }, []);

//     // Fetch months and existing data
//     useEffect(() => {
//         if (schoolId && academicYear) {
//             getAPI(`/get-payroll-academic-year/${schoolId}/${academicYear}`, {}, true)
//                 .then((res) => {
//                     if (!res.hasError && res.data.data) {
//                         const { startDate, endDate } = res.data.data;
//                         generateMonthsList(startDate, endDate);
//                         fetchExistingPFData();
//                     } else {
//                         toast.error("No academic year record found.");
//                         setMonths([]);
//                     }
//                 })
//                 .catch((err) => {
//                     toast.error("Error fetching academic year: " + err.message);
//                 });
//         }
//     }, [academicYear, schoolId]);

//     // Generate month labels
//     const generateMonthsList = (start, end) => {
//         let startMoment = moment(start, "YYYY-MM-DD");
//         let endMoment = moment(end, "YYYY-MM-DD");

//         const monthList = [];
//         const dataObj = {};

//         while (startMoment <= endMoment) {
//             const label = startMoment.format("MMM-YY");
//             monthList.push(label);
//             dataObj[label] = {
//                 mandatoryPFContribution: "",
//                 voluntaryPFContribution: ""
//             };
//             startMoment = startMoment.add(1, "month");
//         }

//         setMonths(monthList);
//         setPfData(dataObj);
//     };

//     // Fetch existing data
//     const fetchExistingPFData = async () => {
//         try {
//             const res = await getAPI(
//                 `/get-employee-pf-details/${schoolId}/${employeeId}/${academicYear}`,
//                 {},
//                 true
//             );

//             if (!res.hasError && res.data.data?.pfRecords) {
//                 const records = res.data.data.pfRecords;
//                 const updated = {};
//                 const saved = [];
//                 records.forEach(record => {
//                     updated[record.monthLabel] = {
//                         mandatoryPFContribution: record.mandatoryPFContribution || "",
//                         voluntaryPFContribution: record.voluntaryPFContribution?.toString() || ""
//                     };
//                     saved.push(record.monthLabel);
//                 });

//                 setPfData(prev => ({
//                     ...prev,
//                     ...updated
//                 }));
//                 setSavedMonths(saved);
//             }
//         } catch (err) {
//             toast.error("Error loading existing PF data");
//         }
//     };

//     // Input handler
//     const handleInputChange = (month, field, value) => {
//         setPfData(prev => ({
//             ...prev,
//             [month]: {
//                 ...prev[month],
//                 [field]: value
//             }
//         }));
//     };

//     // Copy previous month
//     const copyPreviousMonth = (index) => {
//         if (index === 0) return;
//         const prevMonth = months[index - 1];
//         const currMonth = months[index];
//         setPfData(prev => ({
//             ...prev,
//             [currMonth]: {
//                 ...prev[prevMonth]
//             }
//         }));
//     };

//     // Submit a single month
//     const handleMonthSubmit = async (month) => {
//         const data = pfData[month];

//         if (!data.mandatoryPFContribution || data.voluntaryPFContribution === "") {
//             toast.error(`Fill all fields before saving for ${month}`);
//             return;
//         }

//         const payload = {
//             schoolId,
//             employeeId,
//             academicYear,
//             pfData: {
//                 [month]: {
//                     mandatoryPFContribution: data.mandatoryPFContribution,
//                     voluntaryPFContribution: data.voluntaryPFContribution
//                 }
//             }
//         };

//         try {
//             const res = await postAPI("/post-employee-pf-record", payload, {}, true);
//             if (!res.hasError) {
//                 toast.success(`Saved PF data for ${month}`);
//                 setSavedMonths(prev => [...new Set([...prev, month])]);
//             } else {
//                 toast.error(`Failed to save PF data for ${month}`);
//             }
//         } catch (err) {
//             toast.error(`Error saving PF data for ${month}: ${err.message}`);
//         }
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="card-header mb-2 d-flex align-items-center">
//                                 <h4 className="card-title flex-grow-1 text-center">Provident Fund Details</h4>
//                                 <div>
//                                     <select
//                                         className="custom-select border border-dark"
//                                         value={academicYear}
//                                         onChange={(e) => setAcademicYear(e.target.value)}
//                                     >
//                                         <option>2025-26</option>
//                                         <option>2026-27</option>
//                                         <option>2027-28</option>
//                                         <option>2028-29</option>
//                                         <option>2029-30</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             <div className="table-responsive mb-2 px-md-4">
//                                 <table className="table text-dark border border-dark mb-4">
//                                     <thead>
//                                         <tr className="payroll-table-header">
//                                             <th className="text-center border border-dark w-25">Month</th>
//                                             <th className="text-center border border-dark w-25">Mandatory PF Contribution</th>
//                                             <th className="text-center border border-dark w-25">Voluntary PF Contribution</th>
//                                             <th className="text-center border border-dark w-25">Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//   {months.map((month, index) => {
//     const isDisabled = savedMonths.includes(month); 

//     return (
//       <tr key={month}>
//         <td className="text-center border border-dark">{month}</td>
//         <td className="border border-dark">
//           <select
//             className="form-control"
//             value={pfData[month]?.mandatoryPFContribution || ""}
//             disabled={isDisabled} // ✅ disable if saved
//             onChange={(e) =>
//               handleInputChange(month, "mandatoryPFContribution", e.target.value)
//             }
//           >
//             <option value="">Select</option>
//             <option value="PF Salary (Max 15,000)">PF Salary (Max 15,000)</option>
//             <option value="PF Salary (More Than 15,000)">PF Salary (More Than 15,000)</option>
//           </select>
//         </td>
//         <td className="border border-dark">
//           <input
//             type="number"
//             className="form-control"
//             min={0}
//             value={pfData[month]?.voluntaryPFContribution || ""}
//             disabled={isDisabled} // ✅ disable if saved
//             onChange={(e) =>
//               handleInputChange(month, "voluntaryPFContribution", e.target.value)
//             }
//           />
//         </td>
//         <td className="border border-dark text-center">
//           {index > 0 && !isDisabled && (
//             <button
//               type="button"
//               className="btn btn-primary me-2"
//               onClick={() => copyPreviousMonth(index)}
//               title="Copy previous month"
//             >
//               <MdOutlineAutorenew />
//             </button>
//           )}
//           {!isDisabled && (
//             <button
//               type="button"
//               className="btn btn-success"
//               onClick={() => handleMonthSubmit(month)}
//             >
//               Save
//             </button>
//           )}
//         </td>
//       </tr>
//     );
//   })}
// </tbody>

//                                 </table>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EmployeeProvidentFund;
