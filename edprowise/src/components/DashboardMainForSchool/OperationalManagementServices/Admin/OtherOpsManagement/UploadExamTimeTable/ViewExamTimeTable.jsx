import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewExamTimeTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rec = location.state; 
console.log("View Exam Timetable",rec);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (rec?.examDetails) {
      setRows(rec.examDetails);
    }
  }, [rec]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-1">
                  <h4 className=" payroll-title text-center mb-0 flex-grow-1">
                    View Exam Time Table
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

              {/* Display Basic Info */}
              <div className="row mt-3">
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">
                      Class <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={rec?.className || ""}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">
                      Section <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={rec?.sectionName || ""}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">
                      Name of Exam <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={rec?.examName || ""}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Display Exam Details Table */}
              <div className="table-responsive px-lg-5 pb-4">
                <table className="table text-dark border border-dark mb-1">
                  <thead>
                    <tr className="payroll-table-header">
                      <th className="text-center border border-dark text-nowrap p-2">
                        Date
                      </th>
                      <th className="text-center border border-dark text-nowrap p-2">
                        Subject
                      </th>
                      <th className="text-center border border-dark text-nowrap p-2">
                        From
                      </th>
                      <th className="text-center border border-dark text-nowrap p-2">
                        To
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length > 0 ? (
                      rows.map((row, index) => (
                        <tr key={index} className="payroll-table-body">
                          <td className="text-start border border-dark p-2">
                            <input
                              type="date"
                              value={
                                row.examDate
                                  ? new Date(row.examDate)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                              className="form-control payroll-table-body payroll-input-border"
                              readOnly
                            />
                          </td>
                          <td className="text-start border border-dark p-2">
                            <input
                              type="text"
                              value={row.subjectName || ""}
                              className="form-control payroll-table-body payroll-input-border"
                              readOnly
                            />
                          </td>
                          <td className="text-start border border-dark p-2">
                            <input
                              type="text"
                              value={row.fromTime || ""}
                              className="form-control payroll-table-body payroll-input-border text-end"
                              readOnly
                            />
                          </td>
                          <td className="text-start border border-dark p-2">
                            <input
                              type="text"
                              value={row.toTime || ""}
                              className="form-control payroll-table-body payroll-input-border text-end"
                              readOnly
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No exam details found
                        </td>
                      </tr>
                    )}
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

export default ViewExamTimeTable;
