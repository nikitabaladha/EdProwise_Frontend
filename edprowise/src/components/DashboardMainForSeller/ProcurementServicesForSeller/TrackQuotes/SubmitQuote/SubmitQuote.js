import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import postAPI from "../../../../../api/postAPI";
import { useLocation } from "react-router-dom";

const SubmitQuote = () => {
  const location = useLocation();
  const enquiryNumber = location.state?.enquiryNumber;

  const [formData, setFormData] = useState({
    quotedAmount: "",
    description: "",
    remarksFromSupplier: "",
    expectedDeliveryDateBySeller: "",
    paymentTerms: "",
    advanceRequiredAmount: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (enquiryNumber) {
        data.append("enquiryNumber", enquiryNumber);
      }

      const response = await postAPI("/submit-quote", data, true);

      if (!response.hasError) {
        toast.success("Quote submitted successfully!");

        setFormData({
          quotedAmount: "",
          description: "",
          remarksFromSupplier: "",
          expectedDeliveryDateBySeller: "",
          paymentTerms: "",
          advanceRequiredAmount: "",
        });

        navigate(-1);
      } else {
        toast.error(response.message || "Failed to add school");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
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
                    Submit Quote
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="quotedAmount" className="form-label">
                        Quoted Amount
                      </label>
                      <input
                        type="number"
                        id="quotedAmount"
                        name="quotedAmount"
                        className="form-control"
                        value={formData.quotedAmount}
                        onChange={handleChange}
                        required
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="expectedDeliveryDateBySeller"
                        className="form-label"
                      >
                        Expected Delivery Date by Seller
                      </label>
                      <input
                        type="date"
                        id="expectedDeliveryDateBySeller"
                        name="expectedDeliveryDateBySeller"
                        className="form-control"
                        value={formData.expectedDeliveryDateBySeller}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        rows={2}
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="remarksFromSupplier"
                        className="form-label"
                      >
                        Remarks from Supplier
                      </label>
                      <textarea
                        id="remarksFromSupplier"
                        name="remarksFromSupplier"
                        className="form-control"
                        rows={2}
                        value={formData.remarksFromSupplier}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="paymentTerms" className="form-label">
                        Payment Terms
                      </label>
                      <input
                        type="text"
                        id="paymentTerms"
                        name="paymentTerms"
                        className="form-control"
                        value={formData.paymentTerms}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="advancesRequiredAmount"
                        className="form-label"
                      >
                        Advances Required Amount
                      </label>
                      <input
                        type="number"
                        id="advanceRequiredAmount"
                        name="advanceRequiredAmount"
                        className="form-control"
                        value={formData.advanceRequiredAmount}
                        onChange={handleChange}
                        required
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Submit
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

export default SubmitQuote;
