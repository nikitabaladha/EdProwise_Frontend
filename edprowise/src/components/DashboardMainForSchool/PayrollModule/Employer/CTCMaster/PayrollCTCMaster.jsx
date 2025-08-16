// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import getAPI from "../../../../../api/getAPI";
// import CreatableSelect from "react-select/creatable";

// const PayrollCTCMaster = () => {
//     const [schoolId, setSchoolId] = useState(null);
//     const [academicYear, setAcademicYear] = useState("2025-26");
//     const [ctcComponents, setCtcComponents] = useState([]);
//     const [employeeList, setEmployeeList] = useState([]);

//     const [sortField, setSortField] = useState("employeeId");
//     const [sortOrder, setSortOrder] = useState("asc");
//     const [selectedMonth, setSelectedMonth] = useState("");

//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//         const id = userDetails?.schoolId;
//         if (!id) {
//             toast.error("School ID not found. Please log in again.");
//             return;
//         }
//         setSchoolId(id);
//     }, []);

//     useEffect(() => {
//         if (!schoolId) return;

//         const fetchCTCComponents = async () => {
//             try {
//                 const ctcRes = await getAPI(`/getall-payroll-ctc-component/${schoolId}`);
//                 console.log("CTC res", ctcRes);

//                 if (!ctcRes.hasError && Array.isArray(ctcRes.data?.ctcComponent)) {
//                     setCtcComponents(ctcRes.data.ctcComponent);
//                 } else {
//                     toast.error("CTC component data not found.");
//                 }
//             } catch (error) {
//                 toast.error(error?.response?.data?.message || "Error occurred.");
//             }
//         };

//         const fetchEmployees = async () => {
//             try {
//                 const response = await getAPI(`/getAll-employee-ctc/${schoolId}/${academicYear}`);
//                 console.log("Employee res", response);
//                 if (!response.hasError && Array.isArray(response.data?.data)) {
//                     setEmployeeList(response.data.data);
//                 } else {
//                     toast.error("No employee CTC data found.");
//                 }
//             } catch (error) {
//                 toast.error(error?.response?.data?.message || "Error occurred.");
//             }
//         };

//         fetchCTCComponents();
//         fetchEmployees();
//     }, [schoolId, academicYear]);

//     // Sorting logic
//     const getSortedEmployees = () => {
//         const sorted = [...employeeList];

//         if (selectedMonth) {
//             sorted = sorted.filter((emp) => {
//                 const month = new Date(emp.createdAt).getMonth();
//                 return month === parseInt(selectedMonth);
//             });
//         }

//         sorted.sort((a, b) => {
//             const aInfo = a.employeeInfo || {};
//             const bInfo = b.employeeInfo || {};

//             let valA, valB;

//             if (sortField === "employeeId") {
//                 valA = a.employeeId || "";
//                 valB = b.employeeId || "";
//             } else if (sortField === "employeeName") {
//                 valA = (aInfo.employeeName?.split(" ").slice(-1)[0] || "").toLowerCase();
//                 valB = (bInfo.employeeName?.split(" ").slice(-1)[0] || "").toLowerCase();
//             } else if (sortField === "category") {
//                 valA = (aInfo.categoryOfEmployees || "").toLowerCase();
//                 valB = (bInfo.categoryOfEmployees || "").toLowerCase();
//             } else if (sortField === "grade") {
//                 valA = (aInfo.grade || "").toLowerCase();
//                 valB = (bInfo.grade || "").toLowerCase();
//             }

//             if (valA < valB) return sortOrder === "asc" ? -1 : 1;
//             if (valA > valB) return sortOrder === "asc" ? 1 : -1;
//             return 0;
//         });

//         return sorted;
//     };
//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">

//                             <div className="container">
//                                 <div className="card-header d-flex align-items-center">
//                                     <h4 className="card-title flex-grow-1 text-center">
//                                         CTC Master
//                                     </h4>
//                                     <div>
//                                         <select
//                                             id="yearSelect"
//                                             className="custom-select border border-dark"
//                                             aria-label="Select Year"
//                                             value={academicYear}
//                                             onChange={(e) => setAcademicYear(e.target.value)}
//                                         >
//                                             <option>2025-26</option>
//                                             <option>2026-27</option>
//                                             <option>2027-28</option>
//                                             <option>2028-29</option>
//                                             <option>2029-30</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                     <select
//                                         className="custom-select border border-dark ms-2"
//                                         value={selectedMonth}
//                                         onChange={(e) => setSelectedMonth(e.target.value)}
//                                     >
//                                         <option value="">All Months</option>
//                                         <option value="0">January</option>
//                                         <option value="1">February</option>
//                                         <option value="2">March</option>
//                                         <option value="3">April</option>
//                                         <option value="4">May</option>
//                                         <option value="5">June</option>
//                                         <option value="6">July</option>
//                                         <option value="7">August</option>
//                                         <option value="8">September</option>
//                                         <option value="9">October</option>
//                                         <option value="10">November</option>
//                                         <option value="11">December</option>
//                                     </select>
//                                     </div>
//                                     <div>
//                                         <select
//                                             className="custom-select border border-dark ms-2"
//                                             value={sortField}
//                                             onChange={(e) => setSortField(e.target.value)}
//                                         >
//                                             <option value="employeeId">Sort by ID</option>
//                                             <option value="employeeName">Sort by Name</option>
//                                             <option value="grade">Sort by Grade</option>
//                                             <option value="category">Sort by Category</option>
//                                         </select>
//                                     </div>
//                                     {/* <button
//                                         type="button"
//                                         className="btn btn-outline-dark btn-sm"
//                                         onClick={() =>
//                                             setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
//                                         }
//                                     >
//                                         {sortOrder === "asc" ? "↑ A-Z" : "↓ Z-A"}
//                                     </button> */}
//                                     <div  >


//                                     </div>
//                                 </div>
//                             </div>
//                             <form>
//                                 <div className="table-responsive mb-4">
//                                     <table className="table text-dark mb-4">
//                                         <thead>
//                                             <tr className="payroll-table-header fw-bold">
//                                                 <th className="text-center align-content-center border border-dark p-2" style={{ width: "100px" }}>Employee ID</th>
//                                                 <th className="text-center align-content-center border border-dark p-2" style={{ width: "200px" }}>Employee Name</th>
//                                                 <th className="text-center align-content-center border border-dark p-2" style={{ width: "100px" }}>Grade</th>
//                                                 <th className="text-center align-content-center border border-dark p-2" style={{ width: "100px" }}>Designation</th>
//                                                 <th className="text-center align-content-center border border-dark p-2" style={{ width: "100px" }}>Category</th>
//                                                 {ctcComponents.map((component) => (
//                                                     <th
//                                                         key={component._id}
//                                                         className="text-center align-content-center border border-dark p-2"
//                                                         style={{ width: "100px" }}
//                                                     >
//                                                         {component.ctcComponentName || "Undefine"}
//                                                     </th>
//                                                 ))}
//                                                 <th className="text-center align-content-center border border-dark  p-2" style={{ width: "120px" }}>Total Cost</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {getSortedEmployees().map((emp, index) => (
//                                                 <tr className="payroll-table-body" key={index}>
//                                                     <td className="text-center align-content-center border border-dark p-2">{emp.employeeId}</td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.employeeName}</td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.grade}</td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.jobDesignation}</td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.categoryOfEmployees}</td>
//                                                     {ctcComponents.map((component) => {
//                                                         const matched = emp.components.find(
//                                                             (c) => c.ctcComponentId === component._id
//                                                         );
//                                                         return (
//                                                             <td key={component._id} className="text-end align-content-center border border-dark p-2">
//                                                                 {matched ? matched.annualAmount : "-"}
//                                                             </td>
//                                                         );
//                                                     })}
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2">{emp.totalAnnualCost}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default PayrollCTCMaster;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI";
import CreatableSelect from "react-select/creatable";

const PayrollCTCMaster = () => {
  const [schoolId, setSchoolId] = useState(null);
  const [academicYear, setAcademicYear] = useState("2025-26");
  const [ctcComponents, setCtcComponents] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [sortField, setSortField] = useState("employeeId");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString()); // Default to current month

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
  }, []);

  useEffect(() => {
    if (!schoolId) return;

    const fetchCTCComponents = async () => {
      try {
        const ctcRes = await getAPI(`/getall-payroll-ctc-component/${schoolId}`);
        if (!ctcRes.hasError && Array.isArray(ctcRes.data?.ctcComponent)) {
          let components = ctcRes.data.ctcComponent;

          // Desired order: Basic Salary → HRA → others
          components = components.sort((a, b) => {
            const priority = { "Basic Salary": 1, "HRA": 2 }; // Lower number = higher priority
            const aPriority = priority[a.ctcComponentName] || 99;
            const bPriority = priority[b.ctcComponentName] || 99;

            if (aPriority !== bPriority) return aPriority - bPriority;
            return a.ctcComponentName.localeCompare(b.ctcComponentName); // Sort remaining alphabetically
          });

          setCtcComponents(components);
        } else {
          toast.error("CTC component data not found.");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error occurred.");
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await getAPI(`/getAll-employee-ctc/${schoolId}/${academicYear}`);
        console.log("CTC master get", response);

        if (!response.hasError && Array.isArray(response.data?.data)) {
          setEmployeeList(response.data.data);
        } else {
          toast.error("No employee CTC data found.");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error occurred.");
      }
    };
    fetchCTCComponents();
    fetchEmployees();
  }, [schoolId, academicYear]);

  // Get CTC data for a given employee based on selected month
  const getEmployeeCtcForMonth = (emp, selectedMonth) => {
    const monthEnd = new Date(2025, parseInt(selectedMonth) + 1, 0); // End of selected month
    const applicableDate = new Date(emp.applicableDate);

    if (applicableDate <= monthEnd) {

      return {
        components: emp.components,
        totalAnnualCost: emp.totalAnnualCost,
        applicableDate: emp.applicableDate,
        employeeId: emp.employeeId,
        employeeInfo: emp.employeeInfo,
      };
    } else {
      // Find the latest history entry before monthEnd
      const validHistory = emp.history
        .filter((h) => new Date(h.applicableDate) <= monthEnd)
        .sort((a, b) => new Date(b.applicableDate) - new Date(a.applicableDate));

      if (validHistory.length > 0) {
        // Use latest history entry
        return {
          components: validHistory[0].components,
          totalAnnualCost: validHistory[0].totalAnnualCost,
          applicableDate: validHistory[0].applicableDate,
          employeeId: emp.employeeId,
          employeeInfo: emp.employeeInfo,
        };
      } else {

        return null;
      }
    }
  };

  // Sorting and filtering logic
  const getSortedEmployees = () => {
    let filtered = employeeList
      .map((emp) => getEmployeeCtcForMonth(emp, selectedMonth))
      .filter((emp) => emp !== null); // Exclude employees with no data for the month

    filtered.sort((a, b) => {
      const aInfo = a.employeeInfo || {};
      const bInfo = b.employeeInfo || {};

      let valA, valB;

      if (sortField === "employeeId") {
        valA = a.employeeId || "";
        valB = b.employeeId || "";
      } else if (sortField === "employeeName") {
        valA = (aInfo.employeeName?.split(" ").slice(-1)[0] || "").toLowerCase();
        valB = (bInfo.employeeName?.split(" ").slice(-1)[0] || "").toLowerCase();
      } else if (sortField === "category") {
        valA = (aInfo.categoryOfEmployees || "").toLowerCase();
        valB = (bInfo.categoryOfEmployees || "").toLowerCase();
      } else if (sortField === "grade") {
        valA = (aInfo.grade || "").toLowerCase();
        valB = (bInfo.grade || "").toLowerCase();
      } else if (sortField === "applicableDate") {
        valA = new Date(a.applicableDate).getTime();
        valB = new Date(b.applicableDate).getTime();
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const getTotals = () => {
    const employees = getSortedEmployees();

    const componentTotals = {};
    let grandTotal = 0;

    employees.forEach((emp) => {
      grandTotal += emp.totalAnnualCost;

      emp.components.forEach((c) => {
        if (!componentTotals[c.ctcComponentId]) {
          componentTotals[c.ctcComponentId] = 0;
        }
        componentTotals[c.ctcComponentId] += c.annualAmount;
      });
    });

    return { componentTotals, grandTotal };
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    CTC Master
                  </h4>
                  <div>
                    <select
                      id="yearSelect"
                      className="custom-select border border-dark"
                      aria-label="Select Year"
                      value={academicYear}
                      onChange={(e) => setAcademicYear(e.target.value)}
                    >
                      <option>2025-26</option>
                      <option>2026-27</option>
                      <option>2027-28</option>
                      <option>2028-29</option>
                      <option>2029-30</option>
                    </select>
                  </div>
                  <div>
                    <select
                      className="custom-select border border-dark ms-2"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      <option value="">All Months</option>
                      <option value="0">January</option>
                      <option value="1">February</option>
                      <option value="2">March</option>
                      <option value="3">April</option>
                      <option value="4">May</option>
                      <option value="5">June</option>
                      <option value="6">July</option>
                      <option value="7">August</option>
                      <option value="8">September</option>
                      <option value="9">October</option>
                      <option value="10">November</option>
                      <option value="11">December</option>
                    </select>
                  </div>
                  <div>
                    <select
                      className="custom-select border border-dark ms-2"
                      value={sortField}
                      onChange={(e) => setSortField(e.target.value)}
                    >
                      <option value="employeeId">Sort by ID</option>
                      <option value="employeeName">Sort by Name</option>
                      <option value="grade">Sort by Grade</option>
                      <option value="category">Sort by Category</option>
                      <option value="applicableDate">Sort by Applicable Date</option>
                    </select>
                  </div>
                  {/* <button
                    type="button"
                    className="btn btn-outline-dark btn-sm ms-2"
                    onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                  >
                    {sortOrder === "asc" ? "↑ A-Z" : "↓ Z-A"}
                  </button> */}
                </div>
              </div>
              <form>
                <div className="table-responsive mb-4">
                  <table className="table text-dark mb-4">
                    <thead>
                      <tr className="payroll-table-header fw-bold">
                        <th className="text-center align-content-center border border-dark p-2" style={{ width: "100px" }}>Employee ID</th>
                        <th className="text-center align-content-center border border-dark p-2" style={{ width: "200px" }}>Employee Name</th>
                        <th className="text-center align-content-center border border-dark p-2" style={{ width: "100px" }}>Grade</th>
                        <th className="text-center align-content-center border border-dark p-2" style={{ width: "100px" }}>Designation</th>
                        <th className="text-center align-content-center border border-dark p-2" style={{ width: "100px" }}>Category</th>
                        {ctcComponents.map((component) => (
                          <th
                            key={component._id}
                            className="text-center align-content-center border border-dark p-2"
                            style={{ width: "100px" }}
                          >
                            {component.ctcComponentName || "Undefined"}
                          </th>
                        ))}
                        <th className="text-center align-content-center border border-dark p-2" style={{ width: "120px" }}>Total Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSortedEmployees().map((emp, index) => (
                        <tr className="payroll-table-body" key={index}>
                          <td className="text-center align-content-center border border-dark p-2">{emp.employeeId}</td>
                          <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.employeeName}</td>
                          <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.grade}</td>
                          <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.jobDesignation}</td>
                          <td className="text-start align-content-center border border-dark p-2">{emp.employeeInfo?.categoryOfEmployees}</td>
                          {ctcComponents.map((component) => {
                            const matched = emp.components.find(
                              (c) => c.ctcComponentId === component._id
                            );
                            return (
                              <td key={component._id} className="text-end align-content-center border border-dark p-2">
                                {matched ? matched.annualAmount.toFixed(0) : "-"}
                              </td>
                            );
                          })}
                          <td className="text-end align-content-center border border-dark fw-bold p-2">{emp.totalAnnualCost.toFixed(0)}</td>
                        </tr>
                      ))}
                      {(() => {
                        const { componentTotals, grandTotal } = getTotals();
                        return (
                          <tr className="payroll-table-body fw-bold it-declaration-section-bg">
                            <td className="text-center align-content-center border border-dark fw-bold p-2" colSpan={5}>
                              TOTAL
                            </td>
                            {ctcComponents.map((component) => (
                              <td
                                key={component._id}
                                className="text-end align-content-center border border-dark fw-bold p-2"
                              >
                                {componentTotals[component._id]
                                  ? componentTotals[component._id].toFixed(0)
                                  : "-"}
                              </td>
                            ))}
                            <td className="text-end align-content-center border border-dark fw-bold p-2">
                              {grandTotal.toFixed(0)}
                            </td>
                          </tr>
                        );
                      })()}

                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollCTCMaster;