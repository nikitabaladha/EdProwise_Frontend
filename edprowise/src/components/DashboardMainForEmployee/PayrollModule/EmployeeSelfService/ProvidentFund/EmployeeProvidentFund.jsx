// import React, { useState, useEffect } from 'react';
// import { toast } from "react-toastify";
// import moment from 'moment';
// import postAPI from '../../../../../api/postAPI';
// import getAPI from '../../../../../api/getAPI';
// const EmployeeProvidentFund = () => {
//     const [schoolId, setSchoolId] = useState(null);
//     const [employeeId, setEmployeeId] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [year, setYear] = useState(moment().format('YYYY'));
//     const [month, setMonth] = useState(moment().format('MMMM'));
//     const [formData, setFormData] = useState({
//         mandatoryPFContribution: '',
//         voluntaryPFContribution: ''
//     });

//     const currentYear = moment().year();
//     const years = Array.from({ length: currentYear - 2024 + 1 }, (_, i) => 2024 + i);
//     const months = moment.months();
//     const currentMonthIndex = moment().month();
//     const availableMonths = year === currentYear.toString() ? months.slice(0, currentMonthIndex + 1) : months;

//     // Fetch PF details when year or month changes
//     useEffect(() => {
//         const fetchEmployeeDetails = async () => {
//             const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//             const id = userDetails?.schoolId;
//             const empId = userDetails?.userId;

//             if (!id || !empId) {
//                 toast.error("Authentication details missing");
//                 return;
//             }

//             setSchoolId(id);
//             setEmployeeId(empId);

//             const monthKey = moment(`${year}-${month}`, 'YYYY-MMMM').format('YYYY-MM');

//             try {
//                 setIsLoading(true);
//                 const response = await getAPI(`/get-employee-pf-details/${id}/${empId}/${monthKey}`);
//                 if (!response.hasError && response.data.data) {
//                     setFormData({
//                         mandatoryPFContribution: response.data.data.mandatoryPFContribution || '',
//                         voluntaryPFContribution: response.data.data.voluntaryPFContribution || ''
//                     });
//                 } else {
//                     setFormData({ mandatoryPFContribution: '', voluntaryPFContribution: '' });
//                     toast.info("No PF data found for this month");
//                 }
//             } catch (error) {
//                 console.error("Fetch error:", error);
//                 toast.error("Failed to load employee details");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchEmployeeDetails();
//     }, [year, month]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!schoolId || !employeeId) {
//             toast.error("School or Employee ID missing");
//             return;
//         }

//         const monthKey = moment(`${year}-${month}`, 'YYYY-MMMM').format('YYYY-MM');

//         const payload = {
//             schoolId,
//             employeeId,
//             monthKey,
//             pfDetail: {
//                 mandatoryPFContribution: formData.mandatoryPFContribution,
//                 voluntaryPFContribution: Number(formData.voluntaryPFContribution) || 0
//             }
//         };

//         try {
//             setIsLoading(true);
//             const response = await postAPI("/add-or-update-employee-pf", payload,{},true);
//             if (!response.hasError) {
//                 toast.success("PF details saved successfully");
//             } else {
//                 toast.error(response.message || "Something went wrong");
//             }
//         } catch (error) {
//             console.error("Submit Error:", error);
//             toast.error("Failed to submit PF details");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="container">
//                                 <div className="card-header mb-2">
//                                     <h4 className="payroll-title text-center">Provident Fund</h4>
//                                 </div>
//                             </div>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="custom-bg d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
//                                     <div className="d-flex flex-wrap align-items-center gap-3">
//                                         <label className="mb-0 fw-bold">Year:</label>
//                                         <select className="custom-select" value={year} onChange={(e) => setYear(e.target.value)}>
//                                             {years.map(y => <option key={y} value={y}>{y}</option>)}
//                                         </select>

//                                         <label className="mb-0 fw-bold">Month:</label>
//                                         <select className="custom-select" value={month} onChange={(e) => setMonth(e.target.value)}>
//                                             {availableMonths.map(m => <option key={m} value={m}>{m}</option>)}
//                                         </select>
//                                     </div>
//                                 </div>

//                                 <div className="row mb-3">
//                                     <div className="col-md-3">
//                                         <label className="form-label">Mandatory PF Contribution <span className="text-danger">*</span></label>
//                                         <select
//                                             name="mandatoryPFContribution"
//                                             className="form-control"
//                                             value={formData.mandatoryPFContribution}
//                                             onChange={handleChange}
//                                             required
//                                         >
//                                             <option value="">Select PF Contribution</option>
//                                             <option value="PF Salary (Max 15,000)">PF Salary (Max 15,000)</option>
//                                             <option value="PF Salary (More Than 15,000)">PF Salary (More Than 15,000)</option>
//                                         </select>
//                                     </div>
//                                     <div className="col-md-3">
//                                         <label className="form-label">Voluntary PF Contribution</label>
//                                         <input
//                                             type="number"
//                                             name="voluntaryPFContribution"
//                                             className="form-control"
//                                             value={formData.voluntaryPFContribution}
//                                             onChange={handleChange}
//                                             placeholder="Enter Amount"
//                                             min="0"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="text-end">
//                                     <button type="submit" className="btn btn-primary custom-submit-button" disabled={isLoading}>
//                                         {isLoading ? (
//                                             <>
//                                                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                                 Submitting...
//                                             </>
//                                         ) : 'Submit'}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EmployeeProvidentFund;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MdOutlineAutorenew } from "react-icons/md";

// const EmployeeProvidentFund = () => {
//     const [academicYear, setAcademicYear] = useState("");

//     const months = [
//         'April', 'May', 'June', 'July', 'August', 'September',
//         'October', 'November', 'December', 'January', 'February', 'March'
//     ];

//     const navigate = useNavigate();
//     const [rentData, setRentData] = useState(
//         months.reduce((acc, month) => {
//             acc[month] = {
//                 rent: '',
//                 city: '',
//                 landlordName: '',
//                 landlordPan: '',
//                 landlordAddress: '',
//                 receipt: null
//             };
//             return acc;
//         }, {})
//     );

//     const handleChange = (month, field, value) => {
//         setRentData(prev => ({
//             ...prev,
//             [month]: {
//                 ...prev[month],
//                 [field]: value
//             }
//         }));
//     };

//     const handleFileChange = (month, file) => {
//         setRentData(prev => ({
//             ...prev,
//             [month]: {
//                 ...prev[month],
//                 receipt: file
//             }
//         }));
//     };



//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="container">
//                                 <div className="card-header mb-2 d-flex align-items-center">
//                                     <h4 className="card-title flex-grow-1 text-center">House Rent Details</h4>
//                                     <div>
//                                         <select
//                                             className="custom-select border border-dark"
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
//                                 </div>
//                             </div>
//                             <form >
//                                 <div className="table-responsive mb-2 px-md-4">
//                                     <table className="table text-dark border border-dark mb-4">
//                                         <thead>
//                                             <tr className="payroll-table-header">
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2">Month</th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2">Mandatory PF Contribution</th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2">Voluntary PF Contribution</th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2">Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {months.map((month, index) => (
//                                                 <tr key={month} className="payroll-table-body">
//                                                     <td className="text-center align-content-center border border-dark p-2">{month}</td>


//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <select
//                                                             name="mandatoryPFContribution"
//                                                             className="form-control"
//                                                             // value={formData.mandatoryPFContribution}
//                                                             onChange={handleChange}
//                                                             required
//                                                         >
//                                                             <option value="">Select PF Contribution</option>
//                                                             <option value="PF Salary (Max 15,000)">PF Salary (Max 15,000)</option>
//                                                             <option value="PF Salary (More Than 15,000)">PF Salary (More Than 15,000)</option>
//                                                         </select>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="number"
//                                                             name="voluntaryPFContribution"
//                                                             className="form-control"
//                                                             // value={formData.voluntaryPFContribution}
//                                                             onChange={handleChange}
//                                                             placeholder="Enter Amount"
//                                                             min="0"
//                                                         />
//                                                     </td>


//                                                     <td className="border border-dark p-2">
//                                                         {index > 0 && (
//                                                             <button
//                                                                 type="button"
//                                                                 className="btn btn-primary"
//                                                                 data-bs-toggle="tooltip"
//                                                                 data-bs-placement="left"
//                                                                 title="Auto fill same previous month's data"
//                                                                 onClick={() => {
//                                                                     const prevMonth = months[index - 1];
//                                                                     const prevData = rentData[prevMonth];
//                                                                     setRentData(prev => ({
//                                                                         ...prev,
//                                                                         [month]: {
//                                                                             ...prevData,
//                                                                             receipt: null // Don't copy file
//                                                                         }
//                                                                     }));
//                                                                 }}
//                                                             >
//                                                                 <MdOutlineAutorenew />
//                                                             </button>
//                                                         )}

//                                                         {/* <button
//                                                             type="submit"
//                                                             className="btn btn-primary fs-2 custom-submit-button"

//                                                         >
//                                                             Save
//                                                         </button> */}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                                 <div className="text-end">
//                                     <button
//                                         type="submit"
//                                         className="btn btn-primary custom-submit-button"

//                                     >
//                                         Save
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EmployeeProvidentFund;

import React, { useState, useEffect } from 'react';
import { MdOutlineAutorenew } from "react-icons/md";
import getAPI from "../../../../../api/getAPI";
import postAPI from '../../../../../api/postAPI';
import { toast } from "react-toastify";
import moment from "moment";

const EmployeeProvidentFund = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [months, setMonths] = useState([]);
  const [pfData, setPfData] = useState({});
  const [academicYearList, setAcademicYearList] = useState([]);

  // Fetch user details
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    const empid = userDetails?.userId;
    const academicYear = localStorage.getItem("selectedAcademicYear");
 
    if (!id || !empid) {
      toast.error("User details not found. Please login again.");
      return;
    }

    setSchoolId(id);
    setEmployeeId(empid);
    setAcademicYear(academicYear);
    fetchAcademicYears(id);
  }, []);

  // Fetch months and existing data
  useEffect(() => {
  if (academicYear && academicYearList.length > 0) {
    const yearObj = academicYearList.find(y => y.academicYear === academicYear);
    if (yearObj) {
      generateMonthsList(yearObj.startDate, yearObj.endDate);
      fetchExistingPFData();
    }
  }
}, [academicYear, academicYearList]);

  const fetchAcademicYears = async (schoolId) => {
  try {
    const response = await getAPI(`/get-payroll-academic-year/${schoolId}`);
    const years = response.data.data || [];   // <-- array

    setAcademicYearList(years);

    // check localStorage for previously selected year
    const selectedYear = localStorage.getItem("selectedAcademicYear");
    if (selectedYear) {
      const yearObj = years.find(y => y.academicYear === selectedYear);
      if (yearObj) {
        generateMonthsList(yearObj.startDate, yearObj.endDate);
      }
    }
  } catch (err) {
    toast.error("Failed to fetch academic years.");
  }
};

  // Generate month labels
  const generateMonthsList = (start, end) => {
    let startMoment = moment(start, "YYYY-MM-DD");
    let endMoment = moment(end, "YYYY-MM-DD");

    const monthList = [];
    const dataObj = {};

    while (startMoment <= endMoment) {
      const label = startMoment.format("MMM-YY");
      monthList.push(label);
      dataObj[label] = {
        mandatoryPFContribution: "",
        voluntaryPFContribution: ""
      };
      startMoment = startMoment.add(1, "month");
    }

    setMonths(monthList);
    setPfData(dataObj);
  };

  // Fetch existing data
  const fetchExistingPFData = async () => {
    try {
      const res = await getAPI(
        `/get-employee-pf-details/${schoolId}/${employeeId}/${academicYear}`,
        {},
        true
      );
      console.log("PF get", res);

      if (!res.hasError && res.data.data?.pfRecords) {
        const records = res.data.data.pfRecords;
        const updated = {};

        records.forEach(record => {
          updated[record.monthLabel] = {
            mandatoryPFContribution: record.mandatoryPFContribution || "",
            voluntaryPFContribution: record.voluntaryPFContribution?.toString() || ""
          };
        });

        setPfData(prev => ({
          ...prev,
          ...updated
        }));
      }
    } catch (err) {
      toast.error("Error loading existing PF data");
    }
  };

  // Input handler
  const handleInputChange = (month, field, value) => {
    setPfData(prev => ({
      ...prev,
      [month]: {
        ...prev[month],
        [field]: value
      }
    }));
  };

  // Copy previous month
  const copyPreviousMonth = (index) => {
    if (index === 0) return;
    const prevMonth = months[index - 1];
    const currMonth = months[index];
    setPfData(prev => ({
      ...prev,
      [currMonth]: {
        ...prev[prevMonth]
      }
    }));
  };

  // Submit a single month
  const handleMonthSubmit = async (month) => {
    const data = pfData[month];

    if (!data.mandatoryPFContribution || data.voluntaryPFContribution === "") {
      toast.error(`Fill all fields before saving for ${month}`);
      return;
    }

    const payload = {
      schoolId,
      employeeId,
      academicYear,
      pfData: {
        [month]: {
          mandatoryPFContribution: data.mandatoryPFContribution,
          voluntaryPFContribution: data.voluntaryPFContribution
        }
      }
    };

    try {
      const res = await postAPI("/post-employee-pf-record", payload, {}, true);
      if (!res.hasError) {
        toast.success(`Saved PF data for ${month}`);
      } else {
        toast.error(`Failed to save PF data for ${month}`);
      }
    } catch (err) {
      toast.error(`Error saving PF data for ${month}: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="card-header mb-2 d-flex align-items-center">
                <h4 className="card-title flex-grow-1 text-center">Provident Fund Details</h4>
                <div>
                  <select
                    id="yearSelect"
                    className="form-select form-select-sm w-auto"
                    aria-label="Select Year"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                  >
                    <option value="">Select Year</option>
                    {academicYearList.map((yearObj, index) => (
                      <option key={index} value={yearObj.academicYear}>
                        {yearObj.academicYear}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="table-responsive mb-2 px-md-4">
                <table className="table text-dark border border-dark mb-4">
                  <thead>
                    <tr className="payroll-table-header">
                      <th className="text-center border border-dark w-25">Month</th>
                      <th className="text-center border border-dark w-25">Mandatory PF Contribution</th>
                      <th className="text-center border border-dark w-25">Voluntary PF Contribution</th>
                      <th className="text-center border border-dark w-25">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {months.map((month, index) => (
                      <tr key={month}>
                        <td className="text-center border border-dark">{month}</td>
                        <td className="border border-dark">
                          <select
                            className="form-control"
                            value={pfData[month]?.mandatoryPFContribution || ""}
                            onChange={(e) =>
                              handleInputChange(month, "mandatoryPFContribution", e.target.value)
                            }
                          >
                            <option value="">Select</option>
                            <option value="PF Salary (Max 15,000)">PF Salary (Max 15,000)</option>
                            <option value="PF Salary (More Than 15,000)">PF Salary (More Than 15,000)</option>
                          </select>
                        </td>
                        <td className="text-end border border-dark">
                          <input
                            type="number"
                            className="form-control text-end"
                            min={0}
                            value={pfData[month]?.voluntaryPFContribution || ""}
                            onChange={(e) =>
                              handleInputChange(month, "voluntaryPFContribution", e.target.value)
                            }
                          />
                        </td>
                        <td className="border border-dark text-center">
                          {index > 0 && (
                            <button
                              type="button"
                              className="btn btn-primary me-2"
                              onClick={() => copyPreviousMonth(index)}
                              title="Copy previous month"
                            >
                              <MdOutlineAutorenew />
                            </button>
                          )}
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => handleMonthSubmit(month)}
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    ))}
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

export default EmployeeProvidentFund;
