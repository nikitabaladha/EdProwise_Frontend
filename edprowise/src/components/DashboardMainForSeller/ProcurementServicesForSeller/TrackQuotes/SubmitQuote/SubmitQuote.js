import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SubmitQuote = () => {
  const [formData, setFormData] = useState({
    dateOfQuoteSubmitted: "",
    quotedAmount: "",
    remarksFromSupplier: "",
    expectedDeliveryDateMentionedBySeller: "",
    paymentTerms: "",
    advancesRequiredAmount: "",
    description: "",
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
    console.log(`Submitting form data:`, formData);

    toast.success("Quote request submitted successfully!");
    setFormData({
      dateOfQuoteSubmitted: "",
      quotedAmount: "",
      remarksFromSupplier: "",
      expectedDeliveryDateMentionedBySeller: "",
      paymentTerms: "",
      advancesRequiredAmount: "",
      description: "",
    });
    navigate(-1);
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
                      <label
                        htmlFor="dateOfQuoteSubmitted"
                        className="form-label"
                      >
                        Date of Quote Submission
                      </label>
                      <input
                        type="date"
                        id="dateOfQuoteSubmitted"
                        name="dateOfQuoteSubmitted"
                        className="form-control"
                        value={formData.dateOfQuoteSubmitted}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
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
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="expectedDeliveryDateMentionedBySeller"
                        className="form-label"
                      >
                        Expected Delivery Date by Seller
                      </label>
                      <input
                        type="date"
                        id="expectedDeliveryDateMentionedBySeller"
                        name="expectedDeliveryDateMentionedBySeller"
                        className="form-control"
                        value={formData.expectedDeliveryDateMentionedBySeller}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
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
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="advancesRequiredAmount"
                        className="form-label"
                      >
                        Advances Required Amount
                      </label>
                      <input
                        type="number"
                        id="advancesRequiredAmount"
                        name="advancesRequiredAmount"
                        className="form-control"
                        value={formData.advancesRequiredAmount}
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
