import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateSubmittedQuote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    dateOfQuoteSubmitted: "",
    quotedAmount: "",
    remarksFromSupplier: "",
    expectedDeliveryDateMentionedBySeller: "",
    paymentTerms: "",
    advancesRequiredAmount: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        dateOfQuoteSubmitted: product.dateOfQuoteSubmitted || "",
        quotedAmount: product.quotedAmount || "",
        remarksFromSupplier: product.remarksFromSupplier || "",
        expectedDeliveryDateMentionedBySeller:
          product.expectedDeliveryDateMentionedBySeller || "",
        paymentTerms: product.paymentTerms || "",
        advancesRequiredAmount: product.advancesRequiredAmount || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Updating form data:`, formData);

    toast.success("Quote updated successfully!");

    setFormData({
      dateOfQuoteSubmitted: "",
      quotedAmount: "",
      remarksFromSupplier: "",
      expectedDeliveryDateMentionedBySeller: "",
      paymentTerms: "",
      advancesRequiredAmount: "",
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
                    Update Submitted Quote
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
                        Date Of Quote Submitted
                      </label>
                      <input
                        type="text"
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
                        type="text"
                        id="quotedAmount"
                        name="quotedAmount"
                        className="form-control"
                        value={formData.quotedAmount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="remarksFromSupplier"
                        className="form-label"
                      >
                        Remarks From Supplier
                      </label>
                      <input
                        type="text"
                        id="remarksFromSupplier"
                        name="remarksFromSupplier"
                        className="form-control"
                        value={formData.remarksFromSupplier}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="expectedDeliveryDateMentionedBySeller"
                        className="form-label"
                      >
                        Expected Delivery Date
                      </label>
                      <input
                        type="text"
                        id="expectedDeliveryDateMentionedBySeller"
                        name="expectedDeliveryDateMentionedBySeller"
                        className="form-control"
                        value={formData.expectedDeliveryDateMentionedBySeller}
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
                        type="text"
                        id="advancesRequiredAmount"
                        name="advancesRequiredAmount"
                        className="form-control"
                        value={formData.advancesRequiredAmount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Update Quote
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

export default UpdateSubmittedQuote;
