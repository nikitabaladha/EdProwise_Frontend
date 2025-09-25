import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, Link} from "react-router-dom";
import CreatableSelect from "react-select/creatable";


const TeacherViewLessonPlan = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([{}]);

  const addRow = () => {
    setRows([...rows, {}]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
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
                  <h4 className=" payroll-title text-center mb-0 flex-grow-1">
                    View Lesson Plan
                  </h4>
                  <button
                    type="button "
                    className="btn btn-primary ms-2 custom-submit-button"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
              <form onSubmit="">
                {/* <div className="row mt-3">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="vendorCode" className="form-label">
                              Class <span className="text-danger">*</span>
                            </label>
                            <CreatableSelect
                              isClearable
                              name={`ledger`}
                              placeholder="Select Class"
                              className="email-select "
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-6">
                            <label
                              htmlFor="numberOfDayOnLeave"
                              className="form-label"
                            >
                              Section <span className="text-danger">*</span>
                            </label>
                            <CreatableSelect
                              isClearable
                              name={`ledger`}
                              placeholder="Select Section"
                              className="email-select "
                            />
                          </div>
                        </div>
                      </div> */}

                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className="payroll-table-header">
                        {/* <th className="text-center  align-content-center border border-dark text-nowrap p-2">
                          Name of Teacher
                        </th> */}
                        <th className="text-center  align-content-center border border-dark text-nowrap p-2">
                          Subject
                        </th>
                        <th className="text-center  align-content-center border border-dark text-nowrap p-2">
                          Name of Chapter
                        </th>
                        <th
                          className="text-center  align-content-center border border-dark text-nowrap p-2"
                          // style={{ width: "280px" }}
                        >
                          Sub Category
                        </th>
                        <th
                          className="text-center align-content-center border border-dark  p-2"
                          // style={{ width: "150px" }}
                        >
                          Due Date for Completion
                        </th>

                        <th className="text-center align-content-center border border-dark  p-2">
                          Date of Completion
                        </th>
                        <th className="text-center align-content-center border border-dark  p-2">
                          Progress
                        </th>
                        <th className="text-center align-content-center border border-dark  p-2">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={index} className="payroll-table-body">
                          {/* <td className="text-start align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-start"
                              required
                            />
                          </td> */}
                          <td className="text-start align-content-center border border-dark p-2">
                            <input
                              type="text"
                              name={`amountBeforeGst-${index}`}
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              name={`amountBeforeGst-${index}`}
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              name={`gstAmount-${index}`}
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>

                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="date"
                              name={`amountBeforeGst-${index}`}
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>

                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="date"
                              name={`amountBeforeGst-${index}`}
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>

                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              name={`amountBeforeGst-${index}`}
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>

                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              name={`amountBeforeGst-${index}`}
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          {/* <td>
                               <div className="d-flex gap-2 justify-content-center">
                                 <Link
                                   className="btn btn-light btn-sm"
                                 >
                                   <iconify-icon
                                     icon="solar:eye-broken"
                                     className="align-middle fs-18"
                                   />
                                 </Link>
                                 <Link
                                   className="btn btn-soft-primary btn-sm"
                                 >
                                   <iconify-icon
                                     icon="solar:pen-2-broken"
                                     className="align-middle fs-18"
                                   />
                                 </Link>
                                 <Link
                                   className="btn btn-soft-danger btn-sm"
                                   onClick={() => removeRow(index)}
                                 >
                                   <iconify-icon
                                     icon="solar:trash-bin-minimalistic-2-broken"
                                     className="align-middle fs-18"
                                   />
                                 </Link>
                                 
                               </div>
                             </td> */}

                          {/* {rows.length > 1 && (
                               <td className="text-center align-content-center border border-dark p-2">
                                 {rows.length > 1 && (
                                   <button
                                     type="button"
                                     className="btn btn-danger btn-sm"
                                     onClick={() => removeRow(index)}
                                   >
                                     <RxCross1 />
                                   </button>
                                 )}
                               </td>
                             )} */}
                        </tr>
                      ))}
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

export default TeacherViewLessonPlan;