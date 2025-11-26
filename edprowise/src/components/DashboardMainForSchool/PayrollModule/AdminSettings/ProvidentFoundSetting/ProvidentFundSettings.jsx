// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import ConfirmationDialog from "../../../../ConfirmationDialog";
// import getAPI from "../../../../../api/getAPI";
// import postAPI from "../../../../../api/postAPI";
// import putAPI from "../../../../../api/putAPI";
// import deleteAPI from "../../../../../api/deleteAPI";
 
// const ProvidentFundSettings = () => {
//   const [annualLeaveType, setAnnualLeaveType] = useState([]);
//   const [schoolId, setSchoolId] = useState(null);
//   const [academicYear, setAcademicYear] = useState("2025-26");
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [deleteType, setDeleteType] = useState("");

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const id = userDetails?.schoolId;
//     if (!id) {
//       toast.error("School ID not found. Please log in again.");
//       return;
//     }
//     setSchoolId(id);
//     fetchData(id, academicYear);
//   }, [academicYear]);

//   const fetchData = async (schoolId, year) => {
//     try {
//       const res = await getAPI(`/getall-payroll-annual-leave/${schoolId}?academicYear=${year}`, {}, true);
//       console.log("get Response", res);

//       if (!res.hasError && Array.isArray(res.data?.data?.ctcComponent)) {
//         const formatted = res.data.data.ctcComponent.map((cat) => ({
//           id: cat._id,
//           name: cat.annualLeaveTypeName,
//           days: cat.days || 0,
//           isCarryForward: cat.isCarryForward || false,
//           isEditing: false,
//           isNew: false,
//         })); 
//         setAnnualLeaveType(formatted);
//       } else {
//         toast.error(res.message || "No leave type found.");
//         setAnnualLeaveType([]);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch leave type.");
//       console.error("Fetch error:", error);
//       setAnnualLeaveType([]);
//     }
//   };


//   const handleAddRow = () => {
//     const newEntry = {
//       id: Date.now(),
//       name: "",
//       days: "",
//       isCarryForward: false,
//       isEditing: true,
//       isNew: true,
//     };
//     setAnnualLeaveType((prev) => [...prev, newEntry]);
//   };

//   const handleEdit = (id) => {
//     setAnnualLeaveType((prev) =>
//       prev.map((comp) =>
//         comp.id === id ? { ...comp, isEditing: true } : { ...comp, isEditing: false }
//       )
//     );
//   };

//   const handleToggle = (id, newStatus) => {
//     setAnnualLeaveType((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, isCarryForward: newStatus } : item
//       )
//     );
//   };


//   const handleSave = async (id, name, days, isCarryForward, isNew) => {
//     if (!name.trim()) {
//       toast.error("Leave type is required.");
//       return;
//     }
//     const parsedDays = Number(days);
//     if (isNaN(parsedDays) || parsedDays < 0) {
//       toast.error("Days must be a non-negative number.");
//       return;
//     }

//     const payload = {
//       annualLeaveTypeName: name,
//       days: parsedDays,
//       isCarryForward: isCarryForward || false,
//       academicYear,
//       schoolId,
//     };

//     try {
//       if (isNew) {
//         console.log("Create payload", payload);
//         const res = await postAPI("/create-payroll-annual-leave", payload, {}, true);
//         console.log("Create response", res);
//         if (!res.hasError) {
//           toast.success("Leave type created successfully.");
//           fetchData(schoolId, academicYear);
//         } else {
//           toast.error(res.message || "Failed to create leave category.");
//         }
//       } else {
//         console.log("Update payload", payload);
//         const res = await putAPI(`/update-payroll-annual-leave/${id}`, payload, {}, true);
//         console.log("Update response", res);
//         if (!res.hasError) {
//           toast.success("Leave type updated successfully.");
//           fetchData(schoolId, academicYear);
//         } else {
//           toast.error(res.message || "Failed to update leave type.");
//         }
//       }
//     } catch (err) {
//       toast.error("Something went wrong while saving.");
//       console.error("Save error:", err);
//     }
//   };

//   const openDeleteDialog = (comp) => {
//     setSelectedCategory(comp);
//     setDeleteType("ctcComponents");
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteDialogOpen(false);
//     setSelectedCategory(null);
//     setDeleteType("");
//   };

//   const handleDeleteConfirmed = async (id) => {

//   };

//   return (
//     <>
//       <div className="container">
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="card m-2">
//               <div className="card-body custom-heading-padding">
//                 <div className="container">
//                   <div className="card-header border border-0 mb-2 d-flex align-items-center">
//                     <h4 className="card-title flex-grow-1 text-center">
//                       Annual Leave Update
//                     </h4>
//                     <div>
//                       <select
//                         id="yearSelect"
//                         className="custom-select border border-dark"
//                         aria-label="Select Year"
//                         value={academicYear}
//                         onChange={(e) => setAcademicYear(e.target.value)}
//                       >
//                         <option>2025-26</option>
//                         <option>2026-27</option>
//                         <option>2027-28</option>
//                         <option>2028-29</option>
//                         <option>2029-30</option>
//                       </select>
//                     </div>

//                   </div>
//                 </div>

//                 <div className="table-responsive px-lg-7 px-md-5">
//                   <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">

//                     <tbody>
//                       {annualLeaveType.map((comp) => (
//                       <>
//                       <tr className="payroll-table-body text-center">
//                         <td>
//                           <div className="form-check ms-1">
//                             <input type="checkbox" className="form-check-input" />
//                           </div>
//                         </td>

//                         <td>
//                           Provident fund is required in your school?
//                         </td>

//                         <td>
//                           <div className="form-check form-switch d-flex justify-content-center align-items-center gap-1">
//                             <div
//                               className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
//                               style={{ maxWidth: "fit-content" }}
//                             >
//                               <button
//                                 className={`btn ${comp.isCarryForward ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                 type="button"
//                                 style={{
//                                   backgroundColor: comp.isCarryForward ? 'white' : 'black',
//                                   borderColor: comp.isCarryForward ? 'black' : '',
//                                   color: comp.isCarryForward ? 'black' : 'white',
//                                   maxWidth: "fit-content",
//                                   transition: 'all 0.4s ease-in-out',
//                                   boxShadow: "none"
//                                 }}
//                                 // onClick={() => handleToggle(comp.id, true)}
//                               >
//                                 Active
//                               </button>
//                               <button
//                                 type="button"
//                                 className={`btn ${!comp.isCarryForward ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                 style={{
//                                   backgroundColor: !comp.isCarryForward ? 'white' : 'black',
//                                   borderColor: !comp.isCarryForward ? 'black' : '',
//                                   color: !comp.isCarryForward ? 'black' : 'white',
//                                   transition: 'all 0.4s ease-in-out',
//                                   boxShadow: "none",
//                                   maxWidth: "fit-content"
//                                 }}
//                                 // onClick={() => handleToggle(comp.id, false)}
//                               >
//                                 Inactive
//                               </button>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr className="payroll-table-body text-center">
//                         <td>
//                           <div className="form-check ms-1">
//                             <input type="checkbox" className="form-check-input" />
//                           </div>
//                         </td>

//                         <td>
//                           ESI is required in your school?
//                         </td>

//                         <td>
//                           <div className="form-check form-switch d-flex justify-content-center align-items-center gap-1">
//                             <div
//                               className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
//                               style={{ maxWidth: "fit-content" }}
//                             >
//                               <button
//                                 className={`btn ${comp.isCarryForward ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                 type="button"
//                                 style={{
//                                   backgroundColor: comp.isCarryForward ? 'white' : 'black',
//                                   borderColor: comp.isCarryForward ? 'black' : '',
//                                   color: comp.isCarryForward ? 'black' : 'white',
//                                   maxWidth: "fit-content",
//                                   transition: 'all 0.4s ease-in-out',
//                                   boxShadow: "none"
//                                 }}
//                                 // onClick={() => handleToggle(comp.id, true)}
//                               >
//                                 Active
//                               </button>
//                               <button
//                                 type="button"
//                                 className={`btn ${!comp.isCarryForward ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                 style={{
//                                   backgroundColor: !comp.isCarryForward ? 'white' : 'black',
//                                   borderColor: !comp.isCarryForward ? 'black' : '',
//                                   color: !comp.isCarryForward ? 'black' : 'white',
//                                   transition: 'all 0.4s ease-in-out',
//                                   boxShadow: "none",
//                                   maxWidth: "fit-content"
//                                 }}
//                                 // onClick={() => handleToggle(comp.id, false)}
//                               >
//                                 Inactive
//                               </button>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       </>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

                
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isDeleteDialogOpen && selectedCategory && (
//         <ConfirmationDialog
//           onClose={handleDeleteCancel}
//           deleteType={deleteType}
//           id={selectedCategory.id}
//           onDeleted={handleDeleteConfirmed}
//         />
//       )}
//     </>
//   );
// };

// export default ProvidentFundSettings;

import React, { useState, useEffect,useContext } from "react";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI";
import putAPI from "../../../../../api/putAPI";
import { usePayrollSettings } from "./SchoolPayrollSettingsContext";
// import { SchoolPayrollSettingsContext } from "./SchoolPayrollSettingsContext"; 
const ProvidentFundSettings = () => {
  const [schoolId, setSchoolId] = useState(null);
  const [academicYear, setAcademicYear] = useState("");
  const [pfStatus, setPfStatus] = useState(false);
  const [esiStatus, setEsiStatus] = useState(false);
  const [academicYearList, setAcademicYearList] = useState([]);
  
  //  Correct usage of the hook with parentheses
  const { setPfEsiSettings } = usePayrollSettings();
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    const academicYear = localStorage.getItem("selectedAcademicYear");
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
    setAcademicYear(academicYear);
    fetchAcademicYears(id);
    
    fetchSettings(id, academicYear);
  }, []);

  useEffect(() => {
    
      if (schoolId) {
        fetchSettings(schoolId, academicYear)
       }
    }, [schoolId, academicYear]);
  
    const fetchAcademicYears = async (schoolId) => {
      try {
        const response = await getAPI(`/get-payroll-academic-year/${schoolId}`);
        setAcademicYearList(response.data.data || []);
      } catch (err) {
        toast.error('Failed to fetch academic years.');
      }
    };
  

  const fetchSettings = async (schoolId, year) => {
    try {
      const res = await getAPI(`/get-pf-esi-settings/${schoolId}?academicYear=${year}`, {}, true);
      if (!res.hasError) {
        setPfStatus(res.data?.data.pfEnabled || false);
        setEsiStatus(res.data?.data.esiEnabled || false);

        // Update context with initial settings
        setPfEsiSettings({
          pfEnable: res.data?.data.pfEnabled || false,
          esiEnable: res.data?.data.esiEnabled || false,
        });

      } else {
        toast.error(res.message || "Failed to fetch settings.");
        setPfEsiSettings({
          pfEnable: false,
          esiEnable: false,
        });
      }
    } catch (err) {
      toast.error("Something went wrong while fetching settings.");
      console.error(err);
      setPfEsiSettings({
        pfEnable: false,
        esiEnable: false,
      });
    }
  };

  const handleToggle = async (type, newValue) => {
    const payload = {
      schoolId,
      academicYear,
      pfEnabled: type === "pf" ? newValue : pfStatus,
      esiEnabled: type === "esi" ? newValue : esiStatus,
    };

    try {
      const res = await putAPI(`/update-pf-esi-settings`, payload, {}, true);
      if (!res.hasError) {
        toast.success(`${type.toUpperCase()} setting updated.`);
        if (type === "pf") setPfStatus(newValue);
        else if (type === "esi") setEsiStatus(newValue);
        // Update context with new settings
        setPfEsiSettings({
          pfEnable: type === "pf" ? newValue : pfStatus,
          esiEnable: type === "esi" ? newValue : esiStatus,
        });
      } else {
        toast.error(res.message || "Failed to update settings.");
      }
    } catch (err) {
      toast.error("Error updating settings.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="card-header border-0 mb-2 d-flex align-items-center">
                <h4 className="card-title flex-grow-1 text-center">
                  PF & ESI Settings
                </h4>
                <div>
                  <select
                        className="form-select form-select-sm w-auto"
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

              <div className="table-responsive px-lg-7 px-md-5">
                <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                  <tbody>
                    {/* Provident Fund Row */}
                    <tr className="payroll-table-body text-center">
                      {/* <td>
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </td> */}
                      <td>Provident Fund is required in your school?</td>
                      <td>
                        <div className="form-check form-switch d-flex justify-content-center align-items-center gap-1">
                          <div
                            className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                            style={{ maxWidth: "fit-content" }}
                          >
                            <button
                              className={`btn ${pfStatus ? 'btn-primary' : 'btn-dark'} rounded-pill`}
                              type="button"
                              style={{
                                backgroundColor: pfStatus ? 'white' : 'black',
                                borderColor: pfStatus ? 'black' : '',
                                color: pfStatus ? 'black' : 'white',
                                maxWidth: "fit-content",
                                transition: 'all 0.4s ease-in-out',
                                boxShadow: "none"
                              }}
                              onClick={() => handleToggle("pf", true)}
                            >
                              Yes
                            </button>
                            <button
                              className={`btn ${!pfStatus ? 'btn-primary' : 'btn-dark'} rounded-pill`}
                              type="button"
                              style={{
                                backgroundColor: !pfStatus ? 'white' : 'black',
                                borderColor: !pfStatus ? 'black' : '',
                                color: !pfStatus ? 'black' : 'white',
                                maxWidth: "fit-content",
                                transition: 'all 0.4s ease-in-out',
                                boxShadow: "none"
                              }}
                              onClick={() => handleToggle("pf", false)}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* ESI Row */}
                    <tr className="payroll-table-body text-center">
                      {/* <td>
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </td> */}
                      <td>ESI is required in your school?</td>
                      <td>
                        <div className="form-check form-switch d-flex justify-content-center align-items-center gap-1">
                          <div
                            className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                            style={{ maxWidth: "fit-content" }}
                          >
                            <button
                              className={`btn ${esiStatus ? 'btn-primary' : 'btn-dark'} rounded-pill`}
                              type="button"
                              style={{
                                backgroundColor: esiStatus ? 'white' : 'black',
                                borderColor: esiStatus ? 'black' : '',
                                color: esiStatus ? 'black' : 'white',
                                maxWidth: "fit-content",
                                transition: 'all 0.4s ease-in-out',
                                boxShadow: "none"
                              }}
                              onClick={() => handleToggle("esi", true)}
                            >
                              Yes
                            </button>
                            <button
                              className={`btn ${!esiStatus ? 'btn-primary' : 'btn-dark'} rounded-pill`}
                              type="button"
                              style={{
                                backgroundColor: !esiStatus ? 'white' : 'black',
                                borderColor: !esiStatus ? 'black' : '',
                                color: !esiStatus ? 'black' : 'white',
                                maxWidth: "fit-content",
                                transition: 'all 0.4s ease-in-out',
                                boxShadow: "none"
                              }}
                              onClick={() => handleToggle("esi", false)}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
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

export default ProvidentFundSettings;

