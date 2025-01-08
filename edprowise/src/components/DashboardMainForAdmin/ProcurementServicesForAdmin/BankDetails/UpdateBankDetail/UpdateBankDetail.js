import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBankDetail = () => {
  const location = useLocation();
  const bankDetail = location.state?.bankDetail || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    accountType: "",
  });

  useEffect(() => {
    if (bankDetail) {
      setFormData({
        accountNumber: bankDetail.accountNumber || "",
        bankName: bankDetail.bankName || "",
        ifscCode: bankDetail.ifscCode || "",
        accountType: bankDetail.accountType || "",
      });
    }
  }, [bankDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Simulate API update request
      console.log("Updated Bank Detail:", formData);

      // Show success message
      toast.success("Bank detail updated successfully!");

      // Navigate back or to a different page
      navigate(-1);
    } catch (error) {
      console.error("Error updating bank detail:", error);
      toast.error("Failed to update bank detail. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Update Bank Detail
                  </h4>
                </div>
              </div>
              <form onSubmit={handleUpdate}>
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
                      <label htmlFor="accountType" className="form-label">
                        Type of Account
                      </label>
                      <select
                        id="accountType"
                        name="accountType"
                        className="form-control"
                        value={formData.accountType}
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
                    Update Bank Detail
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBankDetail;
