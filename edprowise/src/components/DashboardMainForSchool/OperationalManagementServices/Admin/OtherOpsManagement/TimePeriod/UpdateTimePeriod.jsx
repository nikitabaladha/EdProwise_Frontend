// import React, { useState, useEffect } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { useLocation, useNavigate } from "react-router-dom";
// import CreatableSelect from "react-select/creatable";
// import getAPI from "../../../../../../api/getAPI";
// import putAPI from "../../../../../../api/putAPI";
// import { toast } from "react-toastify";

// const UpdateTimePeriod = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const record = location.state || {};
//   const [loading, setLoading] = useState(false);
//   const [schoolId, setSchoolId] = useState("");
//   const [records, setRecords] = useState([]);
//   const [className, setClassName] = useState("");
//     const [sectionName, setSectionName] = useState("");
    
//   const [academicYear, setAcademicYear] = useState(
//     localStorage.getItem("selectedAcademicYear") || ""
//   );
  
//   const emptyRow = {
//     subjectId: "",
//     day: "",
//     fromTime: "",
//     toTime: "",
//     staffId: "",
//     remarks: "",
//   };

//   const [rows, setRows] = useState(() =>
//     Array.from({ length: 5 }, () => ({ ...emptyRow }))
//   );

//   const [subjectRows, setSubjectRows] = useState([]);
//   const [isShow, setIsShow] = useState(false);
//   const [staffList, setStaffList] = useState([]);

//   const daysList = [
//     { value: "Monday", label: "Monday" },
//     { value: "Tuesday", label: "Tuesday" },
//     { value: "Wednesday", label: "Wednesday" },
//     { value: "Thursday", label: "Thursday" },
//     { value: "Friday", label: "Friday" },
//     { value: "Saturday", label: "Saturday" },
//   ];

//   const addRow = () => {
//     setRows([
//       ...rows,
//       {
//         subjectId: "",
//         day: "",
//         fromTime: "",
//         toTime: "",
//         staffId: "",
//         remarks: "",
//       },
//     ]);
//   };

//   useEffect(() => {
//       if (!record) {
//         navigate(
//           "/school-dashboard/operational-service/other-management/time-period"
//         );
//         return;
//       }
//       setAcademicYear(record.academicYear);
//       setSchoolId(record.schoolId);
//       setClassName(record.className);
//       setSectionName(record.sectionName);
      
//     }, [record, navigate]);

//   const removeRow = (index) => {
//     if (rows.length <= 1) return;
//     const updatedRows = [...rows];
//     updatedRows.splice(index, 1);
//     setRows(updatedRows);
//   };

//   // Handle changes in form fields
//   const handleRowChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][field] = value;
//     setRows(updatedRows);
//   };

//   // Handle subject selection
//   const handleSubjectChange = (index, selectedOption) => {
//     const updatedRows = [...rows];
//     updatedRows[index].subjectId = selectedOption ? selectedOption.value : "";
//     setRows(updatedRows);
//   };

//   // Handle day selection
//   const handleDayChange = (index, selectedOption) => {
//     const updatedRows = [...rows];
//     updatedRows[index].day = selectedOption ? selectedOption.value : "";
//     setRows(updatedRows);
//   };

//   // Handle staff selection
//   const handleStaffChange = (index, selectedOption) => {
//     const updatedRows = [...rows];
//     updatedRows[index].staffId = selectedOption ? selectedOption.value : "";
//     setRows(updatedRows);
//   };

  
//   useEffect(() => {
//     if (className && sectionName && schoolId && academicYear) {
//       fetchSubjects();
//       fetchstaff();
//     }
//   }, [className, sectionName]);

 
//   const fetchSubjects = async () => {
//     try {
//       const res = await getAPI(
//         `/get-class-subjects?schoolId=${schoolId}&academicYear=${academicYear}&className=${className}&sectionName=${sectionName}`
//       );

//       if (!res.data.hasError) {
//         const subjectsData = res.data.data[0]?.subjects || [];
//         setSubjectRows(
//           subjectsData.map((s) => ({
//             value: s._id,
//             label: s.subjectName,
//           }))
//         );
//       } else {
//         toast.error(res.data.message || "Failed to fetch subjects");
//       }
//     } catch (err) {
//       console.error("Error fetching subjects:", err);
//       toast.error("Error fetching subjects");
//     }
//   };

//   const fetchstaff = async () => {
//     try {
//       const res = await getAPI(`/get-employees/${schoolId}`, true);
//       console.log("staff response", res);

//       if (res.data.success) {
//         const staffOptions = res.data.employees.map((emp) => ({
//           value: emp.employeeId,
//           label: `${emp.employeeName} (${emp.employeeId})`,
//         }));
//         setStaffList(staffOptions);
//       } else {
//         toast.error(res.data.message || "Failed to fetch staff");
//       }
//     } catch (err) {
//       console.error("Error fetching staff:", err);
//       toast.error("Error fetching staff");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

    
//     // Validate all rows have required fields
//     for (let i = 0; i < rows.length; i++) {
//       const row = rows[i];
//       if (
//         !row.subjectId ||
//         !row.day ||
//         !row.fromTime ||
//         !row.toTime ||
//         !row.staffId
//       ) {
//         toast.error(`Please fill all required fields in row ${i + 1}`);
//         return;
//       }
//     }

//     const payload = {
//       schoolId,
//       academicYear,
//       className: className,
//       sectionName: sectionName,
//       timePeriodDetails: rows,
//     };

//     try {
//       const res = await putAPI("/update-time-period/${parentId}", payload, true);

//       if (!res.data.hasError) {
//         toast.success(res.data.message || "Time Period added successfully");
//         navigate(-1);
//       } else {
//         toast.error(res.data.message || "Failed to save time period");
//       }
//     } catch (error) {
//       console.error("Error saving time period:", error);
//       toast.error("Error saving time period");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-1">
//                   <h4 className=" payroll-title text-center mb-0 flex-grow-1">
//                     Update Time Period
//                   </h4>
//                   <button
//                     type="button "
//                     className="btn btn-primary ms-2 custom-submit-button"
//                     onClick={() => {
//                       navigate(-1);
//                     }}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>
//               <form onSubmit="">
//                 <div className="row mt-3">
//                   <div className="col-md-3">
//                     <div className="mb-3">
//                       <label htmlFor="vendorCode" className="form-label">
//                         Class <span className="text-danger">*</span>
//                       </label>
//                       <CreatableSelect
//                         isClearable
//                         name={`ledger`}
//                         placeholder="Select Class"
//                         className="email-select "
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-3">
//                     <div className="mb-6">
//                       <label
//                         htmlFor="numberOfDayOnLeave"
//                         className="form-label"
//                       >
//                         Section <span className="text-danger">*</span>
//                       </label>
//                       <CreatableSelect
//                         isClearable
//                         name={`ledger`}
//                         placeholder="Select Section"
//                         className="email-select "
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="table-responsive pb-4">
//                   <table className="table text-dark border border-dark mb-1">
//                     <thead>
//                       <tr className="payroll-table-header">
//                         <th className="text-center  align-content-center border border-dark text-nowrap p-2">
//                           Name of Subject
//                         </th>
//                         <th
//                           className="text-center  align-content-center border border-dark text-nowrap p-2"
//                           // style={{ width: "280px" }}
//                         >
//                           Days
//                         </th>
//                         <th
//                           className="text-center align-content-center border border-dark  p-2"
//                           // style={{ width: "150px" }}
//                         >
//                           From Time
//                         </th>

//                         <th
//                           className="text-center align-content-center border border-dark  p-2"
//                           // style={{ width: "150px" }}
//                         >
//                           To Time
//                         </th>
//                         <th
//                           className="text-center align-content-center border border-dark  p-2"
//                           style={{ width: "250px" }}
//                         >
//                           List of Staff
//                         </th>
//                         <th
//                           className="text-center align-content-center border border-dark  p-2"
//                           // style={{ width: "150px" }}
//                         >
//                           Any Remarks
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rows.map((row, index) => (
//                         <tr key={index} className="payroll-table-body">
//                           <td className="text-start align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               // name={`amountBeforeGst-${index}`}
//                               className="form-control payroll-table-body payroll-input-border text-start"
//                               required
//                             />
//                           </td>
//                           <td className="text-start align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               name={`amountBeforeGst-${index}`}
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               required
//                             />
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               name={`amountBeforeGst-${index}`}
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               required
//                             />
//                           </td>

//                           <td className="text-center align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               name={`gstAmount-${index}`}
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               required
//                             />
//                           </td>
//                           <td className="text-start align-content-center border border-dark p-2">
//                             <CreatableSelect
//                               isClearable
//                               name={`ledger-${index}`}
//                               // options={emailOptions}
//                               placeholder="Select Staff"
//                               className="email-select payroll-table-body rounded payroll-input-border"
//                             />
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               name={`invoiceAmount-${index}`}
//                               className="form-control payroll-table-body fianance-input-border text-end"
//                               required
//                             />
//                           </td>
//                           {rows.length > 1 && (
//                             <td className="text-center align-content-center border border-dark p-2">
//                               {rows.length > 1 && (
//                                 <button
//                                   type="button"
//                                   className="btn btn-danger btn-sm"
//                                   onClick={() => removeRow(index)}
//                                 >
//                                   <RxCross1 />
//                                 </button>
//                               )}
//                             </td>
//                           )}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="text-end">
//                   <button
//                     type="button"
//                     className="btn btn-danger me-2"
//                     onClick={addRow}
//                   >
//                     Add Row
//                   </button>
//                   <button
//                     type="submit"
//                     className="btn btn-primary custom-submit-button"
//                   >
//                     Update & Published
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

// export default UpdateTimePeriod;

// import React, { useState, useEffect } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { useLocation, useNavigate } from "react-router-dom";
// import CreatableSelect from "react-select/creatable";
// import getAPI from "../../../../../../api/getAPI";
// import putAPI from "../../../../../../api/putAPI";
// import { toast } from "react-toastify";

// const UpdateTimePeriod = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const record = location.state || {};
//   console.log("record ",record);
//   // console.log("records length",record.timePeriodDetails.length);
//   const [records, setRecords] = useState([]);
    
//   const [loading, setLoading] = useState(false);
//   const [schoolId, setSchoolId] = useState("");
//   const [className, setClassName] = useState("");
//   const [sectionName, setSectionName] = useState("");
//   const [academicYear, setAcademicYear] = useState(
//     localStorage.getItem("selectedAcademicYear") || ""
//   );

//   const emptyRow = {
//     subjectId: "",
//     day: "",
//     fromTime: "",
//     toTime: "",
//     staffId: "",
//     remarks: "",
//   };

//   const [rows, setRows] = useState([]);
//   const [subjectRows, setSubjectRows] = useState([]);
//   const [staffList, setStaffList] = useState([]);

//   const daysList = [
//     { value: "Monday", label: "Monday" },
//     { value: "Tuesday", label: "Tuesday" },
//     { value: "Wednesday", label: "Wednesday" },
//     { value: "Thursday", label: "Thursday" },
//     { value: "Friday", label: "Friday" },
//     { value: "Saturday", label: "Saturday" },
//   ];

//   // Load data on mount
//   useEffect(() => {
//     if (!record ) {
//       navigate(
//         "/school-dashboard/operational-service/other-management/time-period"
//       );
//       return;
//     }
//     setAcademicYear(record.academicYear);
//     setSchoolId(record.schoolId);
//     setClassName(record.className);
//     setSectionName(record.sectionName);

//     // Pre-fill rows from record
//     // setRows(
//     //   record.timePeriodDetails.length > 0
//     //     ? record.timePeriodDetails
//     //     : [emptyRow]
//     // );
//   }, [record, navigate]);

//   // useEffect(() => {
//   //   if (record && Array.isArray(record.timePeriodDetails)) {
//   //     console.log("records length", record.timePeriodDetails.length);
//   //     setRows(record.timePeriodDetails); 
//   //   }
//   // }, [record]); 

//   useEffect(() => {
//     if (className && sectionName && schoolId && academicYear) {
//       console.log("res of class",className);
//       console.log("res of section",sectionName);
//       console.log("res of school",schoolId);
//       console.log("res of acade",academicYear);
//       fetchSubjects();
//       fetchStaff();
//       fetchData();
//     }
//   }, [className, sectionName]);

//   const fetchSubjects = async () => {
//     try {
//       const res = await getAPI(
//         `/get-class-subjects?schoolId=${schoolId}&academicYear=${academicYear}&className=${className}&sectionName=${sectionName}`
//       );
//       console.log("get suject in update",res);
      
//       if (!res.data.hasError) {
//         const subjectsData = res.data.data[0]?.subjects || [];
//         setSubjectRows(
//           subjectsData.map((s) => ({
//             value: s._id,
//             label: s.subjectName,
//           }))
//         );
//       } else {
//         toast.error(res.data.message || "Failed to fetch subjects");
//       }
//     } catch (err) {
//       console.error("Error fetching subjects:", err);
//       toast.error("Error fetching subjects");
//     }
//   };

//   const fetchStaff = async () => {
//     try { 
//       const res = await getAPI(`/get-employees/${schoolId}`, true);
//        console.log("get staff in update", res);
//       if (res.data.success) {
//         setStaffList(
//           res.data.employees.map((emp) => ({
//             value: emp.employeeId,
//             label: `${emp.employeeName} (${emp.employeeId})`,
//           }))
//         );
//       } else {
//         toast.error(res.data.message || "Failed to fetch staff");
//       }
//     } catch (err) {
//       console.error("Error fetching staff:", err);
//       toast.error("Error fetching staff");
//     }
//   };

//    const fetchData = async () => {
//      setLoading(true);
//      try {
//        const res = await getAPI(
//          `/get-time-period/${schoolId}/${academicYear}/${className}/${sectionName}`
//        );

//        console.log("get data in update", res);

//        if (!res.data.hasError) {
//          const fetchedData = res.data.data || [];
//          setRecords(fetchedData);
//          // ✅ Update rows from fetched data
//          if (Array.isArray(fetchedData[0]?.timePeriodDetails)) {
//            setRows(fetchedData[0].timePeriodDetails);
//          } else {
//            setRows([emptyRow]); // fallback if no data
//          }
//        } else {
//          toast.error(res.data.message || "Failed to fetch records");
//        }
//      } catch (err) {
//        console.error("error", err);
//        toast.error(
//          err.response?.data?.message ||
//            "Something went wrong while fetching time periods"
//        );
//      } finally {
//        setLoading(false);
//      }
//    };


//   const addRow = () => setRows([...rows, { ...emptyRow }]);

//   const removeRow = (index) => {
//     if (rows.length <= 1) return;
//     setRows(rows.filter((_, i) => i !== index));
//   };

//   const handleRowChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][field] = value;
//     setRows(updatedRows);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     for (let i = 0; i < rows.length; i++) {
//       const row = rows[i];
//       if (
//         !row.subjectId ||
//         !row.day ||
//         !row.fromTime ||
//         !row.toTime ||
//         !row.staffId
//       ) {
//         toast.error(`Please fill all required fields in row ${i + 1}`);
//         return;
//       }
//     }

//     const payload = {
//       schoolId,
//       academicYear,
//       className,
//       sectionName,
//       timePeriodDetails: rows,
//     };

//     try {
//       const res = await putAPI(
//         `/update-time-period/${record._id}`,
//         payload,
//         true
//       );
//       if (!res.data.hasError) {
//         toast.success(res.data.message || "Time Period updated successfully");
//         navigate(-1);
//       } else {
//         toast.error(res.data.message || "Failed to update time period");
//       }
//     } catch (error) {
//       console.error("Error saving time period:", error);
//       toast.error("Error saving time period");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-1">
//                   <h4 className="payroll-title text-center mb-0 flex-grow-1">
//                     Update Time Period
//                   </h4>
//                   <button
//                     type="button"
//                     className="btn btn-primary ms-2 custom-submit-button"
//                     onClick={() => navigate(-1)}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className="table-responsive pb-4 mt-3">
//                   <table className="table text-dark border border-dark mb-1">
//                     <thead>
//                       <tr className="payroll-table-header">
//                         <th className="text-center border border-dark">
//                           Subject
//                         </th>
//                         <th className="text-center border border-dark">Day</th>
//                         <th className="text-center border border-dark">
//                           From Time
//                         </th>
//                         <th className="text-center border border-dark">
//                           To Time
//                         </th>
//                         <th className="text-center border border-dark">
//                           Staff
//                         </th>
//                         <th className="text-center border border-dark">
//                           Remarks
//                         </th>
//                         <th className="text-center border border-dark">
//                           Action
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rows.map((row, index) => (
//                         <tr key={index}>
//                           <td className="border border-dark">
//                             <CreatableSelect
//                               value={
//                                 subjectRows.find(
//                                   (s) => s.value === row.subjectId
//                                 ) || null
//                               }
//                               onChange={(opt) =>
//                                 handleRowChange(
//                                   index,
//                                   "subjectId",
//                                   opt ? opt.value : ""
//                                 )
//                               }
//                               options={subjectRows}
//                               placeholder="Select Subject"
//                             />
//                           </td>
//                           <td className="border border-dark">
//                             <CreatableSelect
//                               value={
//                                 daysList.find((d) => d.value === row.day) ||
//                                 null
//                               }
//                               onChange={(opt) =>
//                                 handleRowChange(
//                                   index,
//                                   "day",
//                                   opt ? opt.value : ""
//                                 )
//                               }
//                               options={daysList}
//                               placeholder="Select Day"
//                             />
//                           </td>
//                           <td className="border border-dark">
//                             <input
//                               type="time"
//                               className="form-control"
//                               value={row.fromTime}
//                               onChange={(e) =>
//                                 handleRowChange(
//                                   index,
//                                   "fromTime",
//                                   e.target.value
//                                 )
//                               }
//                             />
//                           </td>
//                           <td className="border border-dark">
//                             <input
//                               type="time"
//                               className="form-control"
//                               value={row.toTime}
//                               onChange={(e) =>
//                                 handleRowChange(index, "toTime", e.target.value)
//                               }
//                             />
//                           </td>
//                           <td className="border border-dark">
//                             <CreatableSelect
//                               value={
//                                 staffList.find(
//                                   (s) => s.value === row.staffId
//                                 ) || null
//                               }
//                               onChange={(opt) =>
//                                 handleRowChange(
//                                   index,
//                                   "staffId",
//                                   opt ? opt.value : ""
//                                 )
//                               }
//                               options={staffList}
//                               placeholder="Select Staff"
//                             />
//                           </td>
//                           <td className="border border-dark">
//                             <input
//                               type="text"
//                               className="form-control"
//                               value={row.remarks}
//                               onChange={(e) =>
//                                 handleRowChange(
//                                   index,
//                                   "remarks",
//                                   e.target.value
//                                 )
//                               }
//                             />
//                           </td>
//                           <td className="border border-dark text-center">
//                             <button
//                               type="button"
//                               className="btn btn-danger btn-sm"
//                               onClick={() => removeRow(index)}
//                             >
//                               <RxCross1 />
//                             </button>
//                             <button
//                               type="button"
//                               className="btn btn-danger btn-sm"
//                               onClick={() => removeRow(index)}
//                             >
//                               <RxCross1 />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="text-end">
//                   <button
//                     type="button"
//                     className="btn btn-danger me-2"
//                     onClick={addRow}
//                   >
//                     Add Row
//                   </button>
//                   <button type="submit" className="btn btn-primary">
//                     Update & Publish
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

// export default UpdateTimePeriod;

import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import getAPI from "../../../../../../api/getAPI";
import putAPI from "../../../../../../api/putAPI";
import { toast } from "react-toastify";

const UpdateTimePeriod = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const record = location.state?.record; 
  
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subjectRows, setSubjectRows] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const daysList = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];

  const emptyRow = {
    subjectId: "",
    day: "",
    fromTime: "",
    toTime: "",
    staffId: "",
    remarks: "",
  };

  // Load data on mount
  useEffect(() => {
    if (!record ) {
      toast.error("No time period record found for editing");
      navigate("/school-dashboard/operational-service/other-management/time-period");
      return;
    }

    // Initialize rows with the record data
    if (record.timePeriodDetails && record.timePeriodDetails.length > 0) {
      setRows(record.timePeriodDetails);
    } else {
      setRows([{ ...emptyRow }]);
    }
  }, [record]);

  useEffect(() => {
    if (record.schoolId && record.academicYear && record.className && record.sectionName) {
      fetchSubjects();
      fetchStaff();
      fetchTimePeriod();
    }
  }, [record]);

  const fetchSubjects = async () => {
    try {
      const res = await getAPI(
        `/get-class-subjects?schoolId=${record.schoolId}&academicYear=${record.academicYear}&className=${record.className}&sectionName=${record.sectionName}`
      );
      
      if (!res.data.hasError) {
        const subjectsData = res.data.data[0]?.subjects || [];
        setSubjectRows(
          subjectsData.map((s) => ({
            value: s._id,
            label: s.subjectName,
          }))
        );
      } else {
        toast.error(res.data.message || "Failed to fetch subjects");
      }
    } catch (err) {
      console.error("Error fetching subjects:", err);
      toast.error("Error fetching subjects");
    }
  };

  const fetchStaff = async () => {
    try { 
      const res = await getAPI(`/get-employees/${record.schoolId}`, true);
      
      if (res.data.success) {
        setStaffList(
          res.data.employees.map((emp) => ({
            value: emp.employeeId,
            label: `${emp.employeeName} (${emp.employeeId})`,
          }))
        );
      } else {
        toast.error(res.data.message || "Failed to fetch staff");
      }
    } catch (err) {
      console.error("Error fetching staff:", err);
      toast.error("Error fetching staff");
    }
  };

  const fetchTimePeriod = async () => {
    try {
      const res = await getAPI(
        `/get-time-period/${record.schoolId}/${record.academicYear}/${record.className}/${record.sectionName}`
      );
      if (!res.data.hasError) {
        setRows(res.data.data.timePeriodDetails);
      } else {
        toast.error(res.data.message || "Failed to fetch time period");
        setRows([emptyRow]);
      }
    } catch (err) {
      console.error("Error fetching time period:", err);
      toast.error("Error fetching time period");
      setRows([emptyRow]);
    }
  };

  const addRow = () => {
    setRows([...rows, { ...emptyRow }]);
  };

  const removeRow = (index) => {
    if (rows.length <= 1) return;
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  // Handle changes in form fields
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Handle subject selection
  const handleSubjectChange = (index, selectedOption) => {
    const updatedRows = [...rows];
    updatedRows[index].subjectId = selectedOption ? selectedOption.value : "";
    setRows(updatedRows);
  };

  // Handle day selection
  const handleDayChange = (index, selectedOption) => {
    const updatedRows = [...rows];
    updatedRows[index].day = selectedOption ? selectedOption.value : "";
    setRows(updatedRows);
  };

  // Handle staff selection
  const handleStaffChange = (index, selectedOption) => {
    const updatedRows = [...rows];
    updatedRows[index].staffId = selectedOption ? selectedOption.value : "";
    setRows(updatedRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (
        !row.subjectId ||
        !row.day ||
        !row.fromTime ||
        !row.toTime ||
        !row.staffId
      ) {
        toast.error(`Please fill all required fields in row ${i + 1}`);
        return;
      }
    }

    const payload = {
      schoolId: record.schoolId,
      academicYear: record.academicYear,
      className: record.className,
      sectionName: record.sectionName,
      timePeriodDetails: rows,
    };

    try {
      const res = await putAPI(
        `/update-time-period/${record._id}`,
        payload,
        true
      );
      
      if (!res.data.hasError) {
        toast.success(res.data.message || "Time Period updated successfully");
        navigate(-1);
      } else {
        toast.error(res.data.message || "Failed to update time period");
      }
    } catch (error) {
      console.error("Error updating time period:", error);
      toast.error("Error updating time period");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-1">
                  <h4 className="payroll-title text-center mb-0 flex-grow-1">
                    Update Time Period
                  </h4>
                  <button
                    type="button"
                    className="btn btn-primary ms-2 custom-submit-button"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">
                      Class
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={record.className || ""}
                      disabled
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">
                      Section
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={record.sectionName || ""}
                      disabled
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">
                      Academic Year
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={record.academicYear || ""}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className="payroll-table-header">
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          Name of Subject
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          Days
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          From Time
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          To Time
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          List of Staff
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          Any Remarks
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={index} className="payroll-table-body">
                          <td className="text-start align-content-center border border-dark p-2">
                            <CreatableSelect
                              isClearable
                              name={`subject-${index}`}
                              options={subjectRows}
                              placeholder="Select Subject"
                              className="email-select payroll-table-body rounded payroll-input-border"
                              value={
                                subjectRows.find(
                                  (opt) => opt.value === row.subjectId
                                ) || null
                              }
                              onChange={(option) =>
                                handleSubjectChange(index, option)
                              }
                            />
                          </td>
                          <td className="text-start align-content-center border border-dark p-2">
                            <CreatableSelect
                              isClearable
                              name={`day-${index}`}
                              options={daysList}
                              placeholder="Select Day"
                              className="email-select payroll-table-body rounded payroll-input-border"
                              value={
                                daysList.find(
                                  (opt) => opt.value === row.day
                                ) || null
                              }
                              onChange={(option) =>
                                handleDayChange(index, option)
                              }
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="time"
                              name={`fromTime-${index}`}
                              className="form-control payroll-table-body payroll-input-border text-end"
                              value={row.fromTime}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "fromTime",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="time"
                              name={`toTime-${index}`}
                              className="form-control payroll-table-body payroll-input-border text-end"
                              value={row.toTime}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "toTime",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </td>
                          <td className="text-start align-content-center border border-dark p-2">
                            <CreatableSelect
                              isClearable
                              name={`staff-${index}`}
                              options={staffList}
                              placeholder="Select Staff"
                              className="email-select payroll-table-body rounded payroll-input-border"
                              value={
                                staffList.find(
                                  (opt) => opt.value === row.staffId
                                ) || null
                              }
                              onChange={(option) =>
                                handleStaffChange(index, option)
                              }
                            />
                          </td>
                          <td className="text-start align-content-center border border-dark p-2">
                            <input
                              type="text"
                              name={`remark-${index}`}
                              className="form-control payroll-table-body fianance-input-border text-end"
                              value={row.remarks}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "remarks",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => removeRow(index)}
                              disabled={rows.length <= 1}
                            >
                              <RxCross1 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={addRow}
                  >
                    Add Row
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Update & Publish
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

export default UpdateTimePeriod;