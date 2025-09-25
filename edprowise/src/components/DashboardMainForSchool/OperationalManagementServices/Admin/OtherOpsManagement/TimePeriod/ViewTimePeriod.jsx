// import React,{useState} from 'react'
// import { useNavigate } from 'react-router-dom';

// const ViewTimePeriod = () => {
//      const navigate = useNavigate();
     
//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="card m-2">
//               <div className="card-body custom-heading-padding">
//                 <div className="container">
//                   <div className="card-header d-flex flex-wrap align-items-center">
//                     <h4 className="card-title flex-grow-1 text-center">
//                       Class Timetable
//                     </h4>
//                   </div>
//                 </div>
//                 <div className="table-responsive">
//                   <table className="table align-middle mb-0 table-hover table-bordered text-center">
//                     <thead className="bg-light-subtle">
//                       <tr className="payroll-table-header">
//                         <th className="text-nowrap">Time</th>
//                         <th className="text-nowrap">Monday</th>
//                         <th className="text-nowrap">Tuesday</th>
//                         <th className="text-nowrap">Wednesday</th>
//                         <th className="text-nowrap">Thursday</th>
//                         <th className="text-nowrap">Friday</th>
//                         <th className="text-nowrap">Saturday</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {/* {timetable.map((row, index) =>
//                         row.break ? (
//                           <tr key={index} className="">
//                             <td className="fw-bold">{row.time}</td>
//                             <td colSpan={6} className="fw-bold text-danger">
//                               {row.label}
//                             </td>
//                           </tr>
//                         ) : (
//                           <tr key={index}>
//                             <td className="fw-bold">{row.time}</td>
//                             <td>{row.Monday}</td>
//                             <td>{row.Tuesday}</td>
//                             <td>{row.Wednesday}</td>
//                             <td>{row.Thursday}</td>
//                             <td>{row.Friday}</td>
//                             <td>{row.Saturday}</td>
//                           </tr>
//                         )
//                       )} */}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="card m-2">
//               <div className="card-body custom-heading-padding">
//                 <div className="container">
//                   <div className="card-header d-flex flex-wrap align-items-center">
//                     <h4 className="card-title flex-grow-1 text-center">
//                       Subject Staff Details
//                     </h4>
//                   </div>
//                 </div>

//                 <div className="table-responsive">
//                   <table className="table align-middle mb-0 table-hover table-centered text-center">
//                     <thead className="bg-light-subtle">
//                       <tr className="payroll-table-header">
//                         <th className="">
//                           <div className="form-check ms-1">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               id="customCheck1"
//                             />
//                             <label
//                               className="form-check-label"
//                               htmlFor="customCheck1"
//                             />
//                           </div>
//                         </th>
//                         <th className="text-nowrap">Subject</th>
//                         <th className="text-nowrap">Staff Name</th>
//                         <th className="text-nowrap">Education</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td className="">
//                           <div className="form-check ms-1">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                             />
//                           </div>
//                         </td>
//                         <td>English</td>
//                         <td>Mr. Arun Varma</td>
//                         <td>B.Ed (English)</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ViewTimePeriod

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getAPI from "../../../../../../api/getAPI";
import { toast } from "react-toastify";
const ViewTimePeriod = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const record = location.state?.record; 
  const [loading, setLoading] = useState(false);
  const [schoolId, setSchoolId] = useState("");
  const [records, setRecords] = useState([]);
  const [className, setClassName] = useState("");
    const [sectionName, setSectionName] = useState("");
    
  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );
  const [timetable, setTimetable] = useState([]);
  const [staffDetails, setStaffDetails] = useState([]);

  useEffect(() => {
    if (!record) {
      // If user navigates directly, go back to list page
      navigate(
        "/school-dashboard/operational-service/other-management/time-period"
      );
      return;
    }
    setAcademicYear(record.academicYear);
    setSchoolId(record.schoolId);
    setClassName(record.className);
    setSectionName(record.sectionName);
    
  }, [record, navigate]);

    useEffect(() => {
       if (className && sectionName && schoolId && academicYear) {
         feachClassTimePeriod();
       }
      
    }, [academicYear,schoolId,className,sectionName]);

   const feachClassTimePeriod = async () => {
     setLoading(true);
     try {
       const res = await getAPI(
         `/get-time-period-by-class/${schoolId}/${academicYear}/${className}/${sectionName}`
       );

       if (!res.data.hasError) {
         setTimetable(res.data.data.timetable || []);
         setStaffDetails(res.data.data.staffDetails || []);
       } else {
         toast.error(res.data.message || "Failed to fetch class timetable");
       }
     } catch (err) {
       console.error(err);
       toast.error("Something went wrong while fetching time periods");
     } finally {
       setLoading(false);
     }
   };


  return (
    <>
      {/* 🔹 Class Timetable */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header d-flex flex-wrap align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      {record?.className} - {record?.sectionName} Timetable
                    </h4>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-bordered text-center">
                    <thead className="bg-light-subtle">
                      <tr className="payroll-table-header">
                        <th className="text-nowrap">Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timetable.length === 0 ? (
                        <tr>
                          <td colSpan={7}>No timetable available</td>
                        </tr>
                      ) : (
                        timetable.map((row, index) =>
                          row.break ? (
                            <tr key={index}>
                              <td className="fw-bold">{row.time}</td>
                              <td colSpan={6} className="fw-bold text-danger">
                                {row.label}
                              </td>
                            </tr>
                          ) : (
                            <tr key={index}>
                              <td className="fw-bold">{row.time}</td>
                              <td>{row.Monday}</td>
                              <td>{row.Tuesday}</td>
                              <td>{row.Wednesday}</td>
                              <td>{row.Thursday}</td>
                              <td>{row.Friday}</td>
                              <td>{row.Saturday}</td>
                            </tr>
                          )
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Subject Staff Details */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header d-flex flex-wrap align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      Subject Staff Details
                    </h4>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered text-center">
                    <thead className="bg-light-subtle">
                      <tr>
                        <th>
                          <div className="form-check ms-1">
                            <input type="checkbox" className="form-check-input" />
                          </div>
                        </th>
                        <th>Subject</th>
                        <th>Staff Name</th>
                        {/* <th>Education</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {staffDetails.length === 0 ? (
                        <tr>
                          <td colSpan={4}>No staff details available</td>
                        </tr>
                      ) : (
                        staffDetails.map((staff, index) => (
                          <tr key={index}>
                            <td>
                              <div className="form-check ms-1">
                                <input type="checkbox" className="form-check-input" />
                              </div>
                            </td>
                            <td>{staff.subject}</td>
                            <td>{staff.staffName}</td>
                            {/* <td>{staff.education}</td> */}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTimePeriod;
