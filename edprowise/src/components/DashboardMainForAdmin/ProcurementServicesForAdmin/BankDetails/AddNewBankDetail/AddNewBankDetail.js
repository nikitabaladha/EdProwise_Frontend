import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddNewBankDetail = () => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    typeOfAccount: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Saved Bank Detail:");

    // Show success toast and redirect to bank details table
    toast.success("Bank detail added successfully!");
    navigate(-1);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Add New Bank Detail
                    </h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="accountNumber" className="form-label">
                          Account Number
                        </label>
                        <input
                          type="text"
                          id="accountNumber"
                          name="accountNumber"
                          className="form-control"
                          value={formData.accountNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="bankName" className="form-label">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          id="bankName"
                          name="bankName"
                          className="form-control"
                          value={formData.bankName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="ifscCode" className="form-label">
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          id="ifscCode"
                          name="ifscCode"
                          className="form-control"
                          value={formData.ifscCode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="typeOfAccount" className="form-label">
                          Type of Account
                        </label>
                        <select
                          id="typeOfAccount"
                          name="typeOfAccount"
                          className="form-control"
                          value={formData.typeOfAccount}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Account Type</option>
                          <option value="Current">Current</option>
                          <option value="Saving">Saving</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Add New Bank Detail
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewBankDetail;
