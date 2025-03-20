import React, { useState } from "react";

const FeesStructure = () => {
  const [step, setStep] = useState(1);
  const [className, setClassName] = useState("");
  const [selectedSections, setSelectedSections] = useState([]);
  const [feesType, setFeesType] = useState("");
  const [numInstallments, setNumInstallments] = useState(1);
  const [installments, setInstallments] = useState([]);

  const sections = ["Section A", "Section B", "Section C"];

  const handleProceed = () => {
    if (step === 1 && className && selectedSections.length > 0) {
      setStep(2);
    } else if (step === 2 && feesType && numInstallments > 0) {
      setInstallments(Array.from({ length: numInstallments }, (_, index) => ({
        name: `Installment ${index + 1}`,
        amount: "",
        dueDate: "",
      })));
      setStep(3);
    }
  };

  const handleInstallmentChange = (index, field, value) => {
    const updatedInstallments = [...installments];
    updatedInstallments[index][field] = value;
    setInstallments(updatedInstallments);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSections((prev) =>
      checked ? [...prev, value] : prev.filter((section) => section !== value)
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <h4 className="card-title text-center">Add Fees Structure</h4>
              <form>
                {step >= 1 && (
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Class</label>
                      <input
                        type="text"
                        className="form-control"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Section</label>
                      <div className="d-flex flex-wrap" >
                      {sections.map((section) => (
                        <div key={section} className="form-check" style={{marginRight:"10px"}}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value={section}
                            checked={selectedSections.includes(section)}
                            onChange={handleCheckboxChange}
                          />
                          <label className="form-check-label mr-2">{section}</label>
                        </div>
                      ))}
                      </div>
                    </div>
                    <div className="text-end mt-3">
                      <button type="button" className="btn btn-primary" onClick={handleProceed}>
                        Proceed
                      </button>
                    </div>
                  </div>
                )}
                {step >= 2 && (
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label className="form-label">Fees Type</label>
                      <select
                        className="form-control"
                        value={feesType}
                        onChange={(e) => setFeesType(e.target.value)}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Tuition Fees">Tuition Fees</option>
                        <option value="Admission Fees">Admission Fees</option>
                        <option value="Composite Fees">Composite Fees</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">No. Of Installments</label>
                      <input
                        type="number"
                        className="form-control"
                        value={numInstallments}
                        onChange={(e) => setNumInstallments(Math.max(1, Number(e.target.value)))}
                        required
                      />
                    </div>
                    <div className="text-end mt-3">
                      <button type="button" className="btn btn-primary" onClick={handleProceed}>
                        Proceed
                      </button>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="table-responsive mt-3">
                    <table className="table table-hover text-center">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Amount</th>
                          <th>Due Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {installments.map((installment, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value={installment.name}
                                onChange={(e) => handleInstallmentChange(index, "name", e.target.value)}
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                value={installment.amount}
                                onChange={(e) => handleInstallmentChange(index, "amount", e.target.value)}
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                className="form-control"
                                value={installment.dueDate}
                                onChange={(e) => handleInstallmentChange(index, "dueDate", e.target.value)}
                                required
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="text-end mt-3">
                      <button type="submit" className="btn btn-primary">
                        Create Fees Structure
                      </button>
                    </div>
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

export default FeesStructure;
