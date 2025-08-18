import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import moment from 'moment';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';

const EsiRegister = () => {
  const [schoolId, setSchoolId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [year, setYear] = useState(moment().format('YYYY'));
  const [month, setMonth] = useState(moment().format('MMMM'));
  const [academicYear, setAcademicYear] = useState('2025-26');
  const [payrollData, setPayrollData] = useState([]);
  const [isAllCopied, setIsAllCopied] = useState(false);
  const [viewMode, setViewMode] = useState('Both');
 
  const currentYear = moment().year();
  const years = Array.from({ length: currentYear - 2025 + 1 }, (_, i) => 2025 + i);
  const months = moment.months();
  const currentMonthIndex = moment().month();
  const availableMonths = year === currentYear.toString() ? months.slice(0, currentMonthIndex + 1) : months;

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (!userDetails?.schoolId) {
      toast.error("School ID not found. Please log in again.");
      return;
    }

    setSchoolId(userDetails.schoolId);
    fetchEmployeePFDetails(userDetails.schoolId);
  }, [year, month]);

  const fetchEmployeePFDetails = async (schoolId) => {

    const monthIndex = String(moment().month(month).month() + 1).padStart(2, '0');
    try {
      setIsLoading(true);
      const res = await getAPI(`/get-esi-calculations?schoolId=${schoolId}&year=${year}&month=${monthIndex}&academicYear=${academicYear}`);
      console.log("res ESI ", res);

      if (res?.data?.data) {
        const initializedData = res.data.data.map(emp => ({
          ...emp,
          deposited: {
            employeeESIDeduction: "",
            employerESIContribution: "",

          },
          copied: false
        }));
        setPayrollData(initializedData);
      } else {
        setPayrollData([]);
        toast.error("No data received.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch payroll summary.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCopyAll = () => {
    const updated = payrollData.map(emp => {
      if (!isAllCopied) {
        return {
          ...emp,
          deposited: {
            employeeESIDeduction: emp.employeeESIDeduction || 0,
            employerESIContribution: emp.employerESIContribution || 0,

          },
          copied: true
        };
      } else {
        return {
          ...emp,
          deposited: {
            employeeESIDeduction: "",
            employerESIContribution: "",

          },
          copied: false
        };
      }
    });
    setIsAllCopied(!isAllCopied);
    setPayrollData(updated);
  };

  const toggleSingleCopy = (index) => {
    const updated = [...payrollData];
    const emp = updated[index];
    if (!emp.copied) {
      updated[index].deposited = {
        employeeESIDeduction: emp.employeeESIDeduction || 0,
        employerESIContribution: emp.employerESIContribution || 0,

      };
      updated[index].copied = true;
    } else {
      updated[index].deposited = {
        employeeESIDeduction: "",
        employerESIContribution: "",

      };
      updated[index].copied = false;
    }
    setPayrollData(updated);
  };

  const handleDepositedChange = (index, field, value) => {
    const updated = [...payrollData];
    updated[index].deposited[field] = value;
    setPayrollData(updated);
  };

  const handleSubmitForPrincipalApproval = async () => {
    const preparedData = payrollData.map(emp => ({
      employeeId: emp.employeeId,
      employeeName: emp.employeeName || '',
      grade: emp.grade || '',
      jobDesignation: emp.jobDesignation || '',
      categoryOfEmployees: emp.categoryOfEmployees || '',
      // grossEarning: Math.floor(Object.values(emp.ctc?.componentEarnings || {}).reduce((a, b) => a + b, 0)),
      grossEarning: emp.grossEarning || '',
      //  Deduction
      deduction: {
        employeeESIDeduction: parseFloat(emp.employeeESIDeduction) || 0,
        employerESIContribution: parseFloat(emp.employerESIContribution) || 0,
      },

      //  Deposited
      deposited: {
        employeeESIDeduction: parseFloat(emp.deposited?.employeeESIDeduction) || 0,
        employerESIContribution: parseFloat(emp.deposited?.employerESIContribution) || 0,
      }
    }));

    try {
      const payload = {
        schoolId,
        academicYear,
        year,
        month,
        data: preparedData
      };

      const res = await postAPI(`/save-esi-deduction-deposited`, payload, {}, true);
      toast.success("ESI deduction and deposited data saved successfully.");
    } catch (err) {
      toast.error("Failed to submit ESI data.");
    }
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">

            <div className="card-body">  {/* //WE are add the custom-heading-padding */}
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center">ESI Register</h4>
                </div>
              </div>
              {/* <form onSubmit={(e) => e.preventDefault()}> */}
              <div className="custom-bg d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <label className="mb-0 fw-bold">Year:</label>
                  <select className="custom-select" value={year} onChange={(e) => setYear(e.target.value)}>
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>

                  <label className="mb-0 fw-bold">Month:</label>
                  <select className="custom-select" value={month} onChange={(e) => setMonth(e.target.value)}>
                    {availableMonths.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                </div>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value)}
                    required
                  >
                    <option value="Deduction">Deduction</option>
                    <option value="Deposited">Deposited</option>
                    <option value="Both">Both</option>
                  </select>

                </div>
              </div>

              <div className="table-responsive mb-4">
                <table className="table text-dark border border-secondary  mb-4">
                  <thead>
                    <tr>
                      <th colSpan={6} className="text-center" style={{ borderBottom: "1px solid black", background: "snow" }}></th>
                      {(viewMode === 'Deduction' || viewMode === 'Both') && (
                        <th colSpan={3} className="text-center border border-dark align-content-center p-2">Deduction</th>
                      )}
                      {(viewMode === 'Deposited' || viewMode === 'Both') && (
                        <th colSpan={4} className="text-center border border-dark align-content-center p-2">
                          Deposited
                          <button type="button" className="btn ms-2 btn-primary" onClick={toggleCopyAll}>
                            {isAllCopied ? "Undo All" : "Copy Deduction"}
                          </button>
                        </th>
                      )}

                    </tr>
                    <tr className="payroll-table-header">
                      <th className="text-center border border-dark align-content-center p-2">Employee ID</th>
                      <th className="text-center border border-dark align-content-center p-2">Employee Name</th>
                      <th className="text-center border border-dark align-content-center p-2">Grade</th>
                      <th className="text-center border border-dark align-content-center p-2">Designation</th>
                      <th className="text-center border border-dark align-content-center p-2">Category</th>
                      <th className="text-center border border-dark align-content-center p-2">Gross Earning</th>
                      {(viewMode === 'Deduction' || viewMode === 'Both') && (
                        <>
                          <th className="text-center border border-dark align-content-center p-2">Employee ESI Deduction</th>
                          <th className="text-center border border-dark align-content-center p-2">Employer ESI Contribution </th>
                          <th className="text-center border border-dark align-content-center p-2">Total</th>
                        </>
                      )}

                      {(viewMode === 'Deposited' || viewMode === 'Both') && (
                        <>
                          <th className="text-center border border-dark align-content-center p-2">Employee ESI Deduction</th>
                          <th className="text-center border border-dark align-content-center p-2">Employer ESI Contribution </th>
                          <th className="text-center border border-dark align-content-center p-2">Total</th>
                          <th className="text-center border border-dark align-content-center p-2">Action</th>
                        </>
                      )}

                    </tr>
                  </thead>
                  <tbody className='border border-dark'>
                    {payrollData.length > 0 ? (
                      <>
                        {payrollData.map((emp, index) => {
                          const deposited = emp.deposited || {};
                          const gross = Math.floor(Object.values(emp.ctc?.componentEarnings || {}).reduce((a, b) => a + b, 0));
                          const deductionTotal = [
                            emp.employeeESIDeduction,
                            emp.employerESIContribution,

                          ].reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(0);

                          const depositedTotal = [
                            deposited.employeeESIDeduction,
                            deposited.employerESIContribution,

                          ].reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(0);
                          return (
                            <tr key={index} className="payroll-table-body">
                              <td className="text-center border border-dark p-2 align-content-center">{emp.employeeId}</td>
                              <td className="text-center border border-dark p-2 align-content-center">{emp.employeeName || '-'}</td>
                              <td className="text-center border border-dark p-2 align-content-center">{emp.grade || '-'}</td>
                              <td className="text-center border border-dark p-2 align-content-center">{emp.jobDesignation || '-'}</td>
                              <td className="text-center border border-dark p-2 align-content-center">{emp.categoryOfEmployees || '-'}</td>
                              <td className="text-center border border-dark p-2 align-content-center fw-bold it-declaration-section-bg">
                                {gross}
                              </td>
                              {(viewMode === 'Deduction' || viewMode === 'Both') && (
                                <>
                                  <td className="text-center border border-dark p-2 align-content-center">{emp.employeeESIDeduction || '0'}</td>
                                  <td className="text-center border border-dark p-2 align-content-center">{emp.employerESIContribution || '0'}</td>
                                  <td className="text-center border border-dark p-2 align-content-center fw-bold it-declaration-section-bg">
                                    {deductionTotal}
                                  </td>
                                </>
                              )}

                              {(viewMode === 'Deposited' || viewMode === 'Both') && (
                                <>
                                  {["employeeESIDeduction", "employerESIContribution",].map(field => (
                                    <td className="border border-dark text-center align-content-center" key={field}>
                                      <input
                                        type="text"
                                        className="form-control text-end payroll-input-border"
                                        value={deposited[field] || ""}
                                        onChange={(e) => handleDepositedChange(index, field, e.target.value)}
                                      />
                                    </td>
                                  ))}
                                  <td className="text-center border border-dark p-2 align-content-center fw-bold it-declaration-section-bg">
                                    {depositedTotal}
                                  </td>
                                  <td className="text-center border border-dark p-2 align-content-center">

                                    <button type="button" className="btn btn-primary" onClick={() => toggleSingleCopy(index)}>
                                      {emp.copied ? "Undo" : "Copy"}
                                    </button>
                                  </td>
                                </>
                              )}
                            </tr>
                          )
                        })}
                        <tr>
                          <td colSpan={5} className="text-center border border-dark p-2 align-content-center fw-bold it-declaration-section-bg">TOTAL</td>
                          <td className="text-center border border-dark p-2 align-content-center fw-bold it-declaration-section-bg">
                            {
                              payrollData.reduce((sum, emp) => {
                                const gross = Math.floor(Object.values(emp.ctc?.componentEarnings || {}).reduce((a, b) => a + b, 0));
                                return sum + gross;
                              }, 0)
                            }
                          </td>



                          {(viewMode === 'Deduction' || viewMode === 'Both') && (
                            <>
                              <td className="text-center border border-dark p-2 align-content-center fw-bold it-declaration-section-bg">
                                {
                                  payrollData.reduce((sum, emp) => sum + (parseFloat(emp.employeeESIDeduction) || 0), 0).toFixed(0)
                                }
                              </td>

                              <td className="text-center border border-dark p-2 align-content-center fw-bold it-declaration-section-bg">
                                {
                                  payrollData.reduce((sum, emp) => sum + (parseFloat(emp.employerESIContribution) || 0), 0).toFixed(0)
                                }
                              </td>

                              <td className="text-center border border-dark p-2 align-content-center fw-bold it-declaration-section-bg">
                                {
                                  payrollData.reduce((sum, emp) => {
                                    const total = [
                                      emp.employeeESIDeduction,
                                      emp.employerESIContribution,

                                    ].reduce((s, v) => s + (parseFloat(v) || 0), 0);
                                    return sum + total;
                                  }, 0).toFixed(0)
                                }
                              </td>

                            </>
                          )}

                          {(viewMode === 'Deposited' || viewMode === 'Both') && (
                            <>
                              {["employeeESIDeduction", "employerESIContribution",].map(field => (
                                <td key={field} className="text-center border border-dark p-2 align-content-center fw-bold it-declaration-section-bg">
                                  {
                                    payrollData.reduce((sum, emp) => sum + (parseFloat(emp.deposited?.[field]) || 0), 0).toFixed(0)
                                  }
                                </td>
                              ))}
                              <td className="text-center border border-dark p-2 align-content-center fw-bold it-declaration-section-bg">
                                {
                                  payrollData.reduce((sum, emp) => {
                                    const deposited = emp.deposited || {};
                                    const total = [
                                      deposited.employeeESIDeduction,
                                      deposited.employerESIContribution,

                                    ].reduce((s, v) => s + (parseFloat(v) || 0), 0);
                                    return sum + total;
                                  }, 0).toFixed(0)
                                }
                              </td>
                              <td className="text-center border border-dark p-2 align-content-center fw-bold it-declaration-section-bg">

                              </td>
                            </>
                          )}
                        </tr>

                      </>
                    ) : (
                      <tr>
                        <td colSpan="23" className="text-center p-3">
                          {isLoading ? 'Loading...' : 'No payroll data available for selected month/year.'}
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>
              </div>

              <div className="card-footer border-top" style={{ overflowX: "auto" }}>
                <div className="d-flex justify-content-end mt-3">
                  <div className="mr-2">

                    <button type="button" className="btn btn-primary custom-submit-button" onClick={handleSubmitForPrincipalApproval}>
                      Submit for Principal Approval
                    </button>
                  </div>
                  <div className="text" style={{ marginLeft: "1rem" }}>
                    <button type="button" className="btn btn-primary custom-submit-button">
                      Proceed for Payment
                    </button>
                  </div>
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EsiRegister;
