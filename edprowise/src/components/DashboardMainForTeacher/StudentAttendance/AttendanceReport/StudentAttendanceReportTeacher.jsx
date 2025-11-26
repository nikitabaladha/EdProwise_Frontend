import React, {useState} from 'react'
import { useNavigate, Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import CreatableSelect from "react-select/creatable";

const StudentAttendanceReportTeacher = () => {
  const navigate = useNavigate();
  
    const navigateToView = (event) => {
      event.preventDefault();
      navigate(
        `/teacher-dashboard/student-attendance-leave/attendance-report/view-report`
      );
    };
    
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center"></div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Student Attendance Report
                  </h4>
                  <FaRegCalendarAlt className="me-2" />
                  <select className="form-select form-select-sm me-2 w-auto">
                    <option>Select Class</option>
                    <option value="1">1 </option>
                    <option value="2">2 </option>
                  </select>

                  <select className="form-select form-select-sm me-2 w-auto">
                    <option>Select Section</option>
                    <option value="A">A </option>
                    <option value="B">B </option>
                  </select>

                  <select className="form-select form-select-sm w-auto">
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Active">Active </option>
                    <option value="Inactive">Inactive </option>
                  </select>
                </div>
              </div>
              {/* <form>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <div className="position-relative">
                        <label htmlFor="admissionNumber" className="form-label">
                          Admission Number
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="admissionNumber"
                          name="admissionNumber"
                          className="form-control pe-5"
                          placeholder="Enter Admission No"
                        />
                        <FaArrowAltCircleRight
                          size={20}
                          className="position-absolute custom-arraow-icon"
                          style={{
                            top: "71%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            color: "#000000",
                            cursor: "pointer",
                          }}
                          title="Fetch Vendor Info"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Name of Student <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        className="form-control"
                        required
                        placeholder="Enter Student Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Book Record Number
                        <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        isClearable
                        placeholder="Select Book Record Number"
                        className="email-select"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="section" className="form-label">
                        Book Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        placeholder="Enter Book Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label">
                        Issued Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        className="form-control"
                        required
                        // defaultValue={today}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Issued by <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        placeholder="Enter Issued by Name"
                      />
                    </div>
                  </div>
                </div>

                
              </form> */}
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th className="">
                        <div className="form-check ms-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheck1"
                          />
                        </div>
                      </th>
                      <th className="text-nowrap">Roll No</th>
                      <th className="text-nowrap">Name</th>
                      <th className="text-nowrap ">Class</th>
                      <th className="text-nowrap">Section</th>
                      <th className="text-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="">
                        <div className="form-check ms-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            // id={`check-${index}`}
                          />
                        </div>
                      </td>
                      <td>1</td>
                      <td>Kunal Shah</td>
                      <td>1</td>
                      <td>A</td>
                     <td className="text-center">
                                             <div className="d-flex gap-2 justify-content-center">
                                               <Link
                                                 className="btn btn-light btn-sm"
                                                 onClick={(event) => navigateToView(event)}
                                               >
                                                 <iconify-icon
                                                   icon="solar:eye-broken"
                                                   className="align-middle fs-18"
                                                 />
                                               </Link>
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

export default StudentAttendanceReportTeacher;