// import React, { useState } from "react";
// import { FaFilter } from "react-icons/fa";
// import { MdSettings } from "react-icons/md";
// import CreatableSelect from "react-select/creatable";

// import { Link } from "react-router-dom";

// const PrincipalApprovalList = () => {
//     const [showFilterPanel, setShowFilterPanel] = useState(false);
//     const [activeTab, setActiveTab] = useState("Select All");

//     const toggleFilterPanel = () => {
//       setShowFilterPanel(!showFilterPanel);
//     };

//     const tabs = [
//       "Select All",
//       "Atudent Admission",
//       "Fees Concession",
//       "Invoice",
//       "Staff Leave",
//       "Employee Joining",
//       "TC",
//       "Staff Resignation",
//       "Salary Payout",
//     ];

//     const pageShowOptions = [
//       { value: "Newest First", label: "Newest First" },
//       { value: "Oldest First", label: "Oldest First" },
//       { value: "Only Pending", label: "Only Pending" },
//       { value: "Name A-Z", label: "Name A-Z" },

//     ];
//   return (
//     <div className="container-fluid">
//       <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center"></div>
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container mt-2">
//                 <div
//                   className="row p-1 border border-dark"
//                   style={{ background: "#bfbfbf" }}
//                 >
//                   <div className="col-md-5 col-10">
//                     <CreatableSelect
//                       isClearable
//                       // options={emailOptions}
//                       className="email-select border border-dark"
//                     />
//                   </div>

//                   {/* <div className="col-md-2"></div> */}
//                   {/* <div className='col-md-2 col-2'>

//                                     </div> */}
//                   <div className="col-md-7 px-0 d-flex align-content-center justify-content-end">
//                     <CreatableSelect
//                       isClearable
//                       placeholder="Sort By"
//                       options={pageShowOptions}
//                       className="email-select border border-dark  me-lg-2"
//                     />
//                     <div
//                       className=" py-1 px-2 borer border-dark fianance-filtter-icons"
//                       style={{ cursor: "pointer" }}
//                       onClick={toggleFilterPanel}
//                     >
//                       <FaFilter />
//                     </div>
//                     <div className=" py-1 px-2 fianance-setting-icons">
//                       <MdSettings />
//                     </div>
//                   </div>
//                 </div>

//               </div>

//               <div className="container">
//                 <div className="card-header d-flex align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">

//                   </h4>

//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrincipalApprovalList;

import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import CreatableSelect from "react-select/creatable";

import StudentAdmisstionApprovalTable from "./StudentAdmisstion/StudentAdmisstionApprovalTable";
import FeesConcessionApprovalTable from "./FeesConcession/FeesConcessionApprovalTable";
import InvoiceApprovalTable from "./Invoice/InvoiceApprovalTable";
import StaffLeaveApprovalTable from "./StaffLeave/StaffLeaveApprovalTable";
import EmployeeJoiningApprovalTable from "./EmployeeJoining/EmployeeJoiningApprovalTable";
import TransferCertificateApprovalTable from "./TransferCertificate/TransferCertificateApprovalTable";
import StaffResignationApprovalTable from "./StaffResignation/StaffResignationApprovalTable";
import SalaryPayoutApprovalTable from "./SalaryPayout/SalaryPayoutApprovalTable";

const PrincipalApprovalList = () => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedTabs, setSelectedTabs] = useState(["Select All"]);
  const [sortOption, setSortOption] = useState(null);

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  const tabs = [
    "Select All",
    "Student Admission",
    "Fees Concession",
    "Invoice",
    "Staff Leave",
    "Employee Joining",
    "TC",
    "Staff Resignation",
    "Salary Payout",
  ];

  const pageShowOptions = [
    { value: "Newest First", label: "Newest First" },
    { value: "Oldest First", label: "Oldest First" },
    { value: "Only Pending", label: "Only Pending" },
    { value: "Name A-Z", label: "Name A-Z" },
  ];

  const handleTabSelection = (tab) => {
    if (tab === "Select All") {
      if (selectedTabs.includes("Select All")) {
        setSelectedTabs([]);
      } else {
        setSelectedTabs(["Select All"]);
      }
    } else {
      let updated = [...selectedTabs];
      if (updated.includes(tab)) {
        updated = updated.filter((t) => t !== tab);
      } else {
        updated.push(tab);
      }
      updated = updated.filter((t) => t !== "Select All");
      setSelectedTabs(updated);
    }
  };

  const getVisibleTabs = () => {
    if (selectedTabs.includes("Select All") || selectedTabs.length === 0) {
      return tabs.filter((t) => t !== "Select All");
    }
    return selectedTabs;
  };

  // Map tab names to components
  const tabComponents = {
    "Student Admission": StudentAdmisstionApprovalTable,
    "Fees Concession": FeesConcessionApprovalTable,
    Invoice: InvoiceApprovalTable,
    "Staff Leave": StaffLeaveApprovalTable,
    "Employee Joining": EmployeeJoiningApprovalTable,
    TC: TransferCertificateApprovalTable,
    "Staff Resignation": StaffResignationApprovalTable,
    "Salary Payout": SalaryPayoutApprovalTable,
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                {/* Filter + Sort Bar */}
                <div className="container mt-2">
                  <div
                    className="row p-1 border border-dark"
                    style={{ background: "#bfbfbf" }}
                  >
                    <div className="col-md-5 col-10">
                      <CreatableSelect
                        isClearable
                        className="email-select border border-dark"
                      />
                    </div>
                    <div className="col-md-7 px-0 d-flex align-content-center justify-content-end">
                      <CreatableSelect
                        isClearable
                        placeholder="Sort By"
                        options={pageShowOptions}
                        value={sortOption}
                        onChange={(option) => setSortOption(option)}
                        className="email-select border border-dark me-lg-2"
                      />
                      <div
                        className="py-1 px-2 border border-dark"
                        style={{ cursor: "pointer" }}
                        onClick={toggleFilterPanel}
                      >
                        <FaFilter />
                      </div>
                      <div className="py-1 px-2 fianance-setting-icons">
                        <MdSettings />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter Panel */}
                {showFilterPanel && (
                  <div className="container mt-2">
                    <div className="card p-3">
                      {tabs.map((tab) => (
                        <div key={tab} className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={tab}
                            checked={selectedTabs.includes(tab)}
                            onChange={() => handleTabSelection(tab)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={tab}
                            style={{ cursor: "pointer" }}
                          >
                            {tab}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Page Header */}
                <div className="container mt-2">
                  <div className="card-header d-flex align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      Request For Approval
                    </h4>
                  </div>
                </div>

                {/* Render Tables */}
                {/* <div className="container mt-3">
                {getVisibleTabs().map((tab) => {
                  const TableComponent = tabComponents[tab];
                  return TableComponent ? (
                    <div key={tab} className="card mb-3">
                      <div className="card-header">{tab}</div>
                      <div className="card-body">
                        <TableComponent sortOption={sortOption} />
                      </div>
                    </div>
                  ) : (
                    <div key={tab} className="card mb-3">
                      <div className="card-header">{tab}</div>
                      <div className="card-body">
                        <p>No table implemented yet for {tab}.</p>
                      </div>
                    </div>
                  );
                })}
              </div> */}
                {/* End Tables */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Render Tables */}
      <div>
        {getVisibleTabs().map((tab) => {
          const TableComponent = tabComponents[tab];
          return TableComponent ? (
            <div key={tab}>
              <TableComponent sortOption={sortOption} />
            </div>
          ) : (
            <div key={tab} className="card mb-3">
              <div className="card-header">{tab}</div>
              <div className="card-body">
                <p>No table implemented yet for {tab}.</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* End Tables */}
    </>
  );
};

export default PrincipalApprovalList;
