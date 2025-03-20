import React, { useState } from 'react';

const SchoolFeesReceipts = () => {
  const [admissionNo, setAdmissionNo] = useState('');
  const [showFirstTable, setShowFirstTable] = useState(false);
  const [showSecondTable, setShowSecondTable] = useState(false);

  const handleFirstProceed = () => {
    if (admissionNo.trim() !== '') {
      setShowFirstTable(true);
    }
  };

  const handleSecondProceed = () => {
    setShowSecondTable(true);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <h4 className="card-title text-center">School Fees Receipts</h4>
              <form>
                {/* Admission Number Input */}
                <div className="row">
                  <div className="col-md-12">
                    <label className="form-label">Admission Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={admissionNo}
                      onChange={(e) => setAdmissionNo(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-end mt-3">
                    <button type="button" className="btn btn-primary" onClick={handleFirstProceed}>
                      Proceed
                    </button>
                  </div>
                </div>

                {showFirstTable && (
                  <>
                    <div className="table-responsive mt-3">
                      <h4 className="card-title text-start">Dashboard</h4>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label className="form-label">Admission No.</label>
                          <p className="form-control">{admissionNo}</p>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Student Name</label>
                          <p className="form-control">John Doe</p>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Class</label>
                          <p className="form-control">10</p>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Section</label>
                          <p className="form-control">A</p>
                        </div>
                      </div>
                      <hr></hr>
                      <table className="table align-middle mb-0 table-hover table-centered text-center">
                        <thead className="bg-light-subtle">
                          <tr>
                            <th>
                              <input type="checkbox" className="form-check-input" />
                            </th>
                            <th>Academic Year</th>
                            <th>Installment</th>
                            <th>Fees Amt</th>
                            <th>Concession</th>
                            <th>Fine</th>
                            <th>Fees Payable</th>
                            <th>Due Date</th>
                            <th>Pay Fees</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <input type="checkbox" className="form-check-input" />
                            </td>
                            <td>2024</td>
                            <td>Section A</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                
                    <div className="text-end mt-3">
                      <button type="button" className="btn btn-primary" onClick={handleSecondProceed}>
                        Proceed
                      </button>
                    </div>
                  </>
                )}

                
                {showSecondTable && (
                  
                  <div className="table-responsive mt-3">
                     <h4 className="card-title text-start">Installment:1</h4>
                    <table className="table align-middle mb-0 table-hover table-centered text-center">
                      <thead className="bg-light-subtle">
                        <tr>
                          <th>
                            <input type="checkbox" className="form-check-input" />
                          </th>
                          <th>Type Of Fees</th>
                          <th>Fees Amount</th>
                          <th>Concession</th>
                          <th>Fees Payable</th>
                          <th>Fees Paid</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input type="checkbox" className="form-check-input" />
                          </td>
                          <td>Tuition Fees</td>
                          <td>1000</td>
                          <td>200</td>
                          <td>800</td>
                          <td>400</td>
                          <td>400</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolFeesReceipts;
