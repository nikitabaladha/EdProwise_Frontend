import { useLocation } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../../export-excel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { formatCost } from "../../../../CommonFunction";

import ViewPrepareQuoteListFromSeller from "./ViewPrepareQuoteListFromSeller";

import getAPI from "../../../../../api/getAPI";

import { format } from "date-fns";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewQuote = () => {
  const location = useLocation();

  const { quote, sellerId, enquiryNumber } = location.state || {};

  const [currentQuote, setCurrentQuote] = useState(quote);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuoteData = async () => {
    console.log("Enquiry Number", enquiryNumber);
    console.log("Seller ID", sellerId);

    try {
      const response = await getAPI(
        `/submit-quote-by-status?enquiryNumber=${enquiryNumber}&sellerId=${sellerId}`
      );
      if (!response.hasError && response.data && response.data.data) {
        setCurrentQuote(response.data.data);

        console.log("Quote data fetched successfully:", response.data.data);
      } else {
        console.error("Error fetching quote data");
      }
    } catch (err) {
      console.error("Error fetching quote data:", err);
    }
  };

  const fetchPrepareQuoteAndProposalData = async (enquiryNumber, sellerId) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId;

    if (!sellerId || !enquiryNumber || !schoolId) {
      console.error("Seller ID, Enquiry Number, or School ID is missing");
      return;
    }

    try {
      // Fetch Prepare Quote data
      const prepareQuoteResponse = await getAPI(
        `/prepare-quote?sellerId=${sellerId}&enquiryNumber=${enquiryNumber}`
      );

      // Fetch Quote Proposal data
      const quoteProposalResponse = await getAPI(
        `/quote-proposal?enquiryNumber=${enquiryNumber}&sellerId=${sellerId}`
      );

      // Fetch Profile data based on the schoolId
      const profileResponse = await getAPI(
        `/quote-proposal-pdf-required-data/${schoolId}/${enquiryNumber}/${sellerId}`
      );

      if (
        !prepareQuoteResponse.hasError &&
        prepareQuoteResponse.data &&
        !quoteProposalResponse.hasError &&
        quoteProposalResponse.data &&
        !profileResponse.hasError &&
        profileResponse.data
      ) {
        const prepareQuoteData = prepareQuoteResponse.data.data;
        const quoteProposalData = quoteProposalResponse.data.data;
        const profileData = profileResponse.data.data;

        navigate(`/school-dashboard/procurement-services/quote-proposal`, {
          state: { prepareQuoteData, quoteProposalData, profileData },
        });
      } else {
        console.error(
          "Error fetching Prepare Quote, Quote Proposal, or School Profile data"
        );
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (enquiryNumber && sellerId) {
      fetchQuoteData();
    }
  }, [enquiryNumber, sellerId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <div className="d-flex justify-content-between">
                    <h4 className="card-title text-center custom-heading-font align-content-center">
                      Submitted Quote Details
                    </h4>
                    <div className="">
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          fetchPrepareQuoteAndProposalData(
                            quote?.enquiryNumber,
                            quote?.sellerId
                          );
                        }}
                        className="btn btn-soft-info btn-sm"
                        title="Download PDF"
                        data-bs-toggle="popover"
                        data-bs-trigger="hover"
                      >
                        <iconify-icon
                          icon="solar:download-broken"
                          className="align-middle fs-18"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="supplierName" className="form-label">
                      Supplier Name
                    </label>
                    <p className="form-control">{currentQuote?.companyName}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="paymentTerms" className="form-label">
                      Payment Terms
                    </label>
                    <p className="form-control">{currentQuote?.paymentTerms}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="dateOfQuoteSubmitted"
                      className="form-label"
                    >
                      Date of Quote Submitted
                    </label>

                    <p className="form-control">
                      {formatDate(currentQuote?.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="expectedDeliveryDateBySeller"
                      className="form-label"
                    >
                      Expected Delivery Date
                    </label>
                    <p className="form-control">
                      {formatDate(currentQuote?.expectedDeliveryDateBySeller)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="quotedAmount" className="form-label">
                      Quoted Amount
                    </label>
                    <p className="form-control">{formatCost(currentQuote?.quotedAmount)}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label
                      htmlFor="advanceRequiredAmount"
                      className="form-label"
                    >
                      Advances Required Amount
                    </label>
                    <p className="form-control">
                      {formatCost(currentQuote?.advanceRequiredAmount)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="remarksFromSupplier" className="form-label">
                      Remarks from Supplier
                    </label>
                    <p className="form-control">
                      {currentQuote?.remarksFromSupplier || "Not Provided"}
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <p className="form-control">{currentQuote?.description || "Not Provided"}</p>
                  </div>
                </div>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
        <></>
      </div>

      <ViewPrepareQuoteListFromSeller />
    </div>
  );
};

export default ViewQuote;
