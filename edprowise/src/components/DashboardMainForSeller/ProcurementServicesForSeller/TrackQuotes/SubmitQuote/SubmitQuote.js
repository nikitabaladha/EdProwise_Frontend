import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useLocation } from "react-router-dom";
import putAPI from "../../../../../api/putAPI";
import getAPI from "../../../../../api/getAPI";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

const SubmitQuote = () => {
  const location = useLocation();
  const enquiryNumber = location.state?.enquiryNumber;

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const sellerId = userDetails?.id;

  const navigate = useNavigate();

  const [submittedQuote, setSubmittedQuote] = useState({
    quotedAmount: "",
    description: "",
    remarksFromSupplier: "",
    expectedDeliveryDateBySeller: "",
    paymentTerms: "",
    advanceRequiredAmount: "",
  });

  useEffect(() => {
    const fetchSubmittedQuoteData = async () => {
      try {
        const response = await getAPI(
          `/submit-quote?enquiryNumber=${enquiryNumber}&sellerId=${sellerId}`
        );
        if (!response.hasError && response.data && response.data.data) {
          const {
            quotedAmount,
            description,
            remarksFromSupplier,
            expectedDeliveryDateBySeller,
            paymentTerms,
            advanceRequiredAmount,
          } = response.data.data;

          const formattedDate = format(
            parseISO(expectedDeliveryDateBySeller),
            "yyyy-MM-dd"
          );

          setSubmittedQuote({
            quotedAmount,
            description,
            remarksFromSupplier,
            expectedDeliveryDateBySeller: formattedDate,
            paymentTerms,
            advanceRequiredAmount,
          });
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Submitted quote data:", err);
      }
    };

    fetchSubmittedQuoteData();
  }, [enquiryNumber, sellerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubmittedQuote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      quotedAmount,
      description,
      remarksFromSupplier,
      expectedDeliveryDateBySeller,
      paymentTerms,
      advanceRequiredAmount,
    } = submittedQuote;

    const dataToSend = {
      quotedAmount,
      description,
      remarksFromSupplier,
      expectedDeliveryDateBySeller,
      paymentTerms,
      advanceRequiredAmount,
    };

    try {
      const response = await putAPI(
        `/submit-quote?enquiryNumber=${enquiryNumber}&sellerId=${sellerId}`,
        dataToSend,
        true
      );

      if (!response.hasError) {
        toast.success("Quote Submitted successfully");
        setSubmittedQuote({
          quotedAmount: "",
          description: "",
          remarksFromSupplier: "",
          expectedDeliveryDateBySeller: "",
          paymentTerms: "",
          advanceRequiredAmount: "",
        });

        navigate(
          "/seller-dashboard/procurement-services/view-requested-quote",
          { state: { enquiryNumber: enquiryNumber } }
        );
      } else {
        toast.error(response.message || "Failed to Prepare quote");
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
                        name="quotedAmount"
                        value={submittedQuote.quotedAmount}
                        onChange={handleInputChange}
                        className="form-control"
                        required
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
                        required
                        type="date"
                        name="expectedDeliveryDateBySeller"
                        value={submittedQuote.expectedDeliveryDateBySeller}
                        onChange={handleInputChange}
                        className="form-control"
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
                        type="text"
                        name="description"
                        value={submittedQuote.description}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        placeholder="Example : All Products are good"
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
                        type="text"
                        name="remarksFromSupplier"
                        value={submittedQuote.remarksFromSupplier}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        placeholder="Example : All Products are good"
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
                        name="paymentTerms"
                        value={submittedQuote.paymentTerms}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Example : 30 days"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="advanceRequiredAmount"
                        className="form-label"
                      >
                        Advances Required Amount
                      </label>
                      <input
                        type="text"
                        name="advanceRequiredAmount"
                        value={submittedQuote.advanceRequiredAmount}
                        onChange={handleInputChange}
                        className="form-control"
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
