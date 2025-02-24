import { useLocation } from "react-router-dom";

import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import getAPI from "../../../../../api/getAPI";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewOrderHistory = () => {
  const location = useLocation();
  const order = location.state?.order;

  const enquiryNumber = location.state?.enquiryNumber;

  const schoolId = location.state?.schoolId;
  const sellerId = location.state?.sellerId;

  const navigate = useNavigate();

  const [quote, setQuote] = useState([]);

  useEffect(() => {
    if (!enquiryNumber) return;
    fetchRequestedQuoteData();
  }, [enquiryNumber]);

  const fetchRequestedQuoteData = async () => {
    try {
      const response = await getAPI(`/get-quote/${enquiryNumber}`, {}, true);

      if (!response.hasError && response.data.data.products) {
        setQuote(response.data.data.products);
        console.log("product data from function", response.data.data.products);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  };

  if (!order) {
    return <div>No order details available.</div>;
  }

  const fetchInvoiceDataForEdprowise = async () => {
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
        `/quote-proposal-pdf-required-data/${schoolId}/${enquiryNumber}`
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

        navigate(
          `/admin-dashboard/procurement-services/invoice-for-edprowise`,
          {
            state: { prepareQuoteData, quoteProposalData, profileData },
          }
        );
      } else {
        console.error(
          "Error fetching Prepare Quote, Quote Proposal, or School Profile data"
        );
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const fetchInvoiceDataForBuyer = async () => {
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
        `/quote-proposal-pdf-required-data/${schoolId}/${enquiryNumber}`
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

        navigate(`/admin-dashboard/procurement-services/invoice-for-buyer`, {
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
                      Order Details
                    </h4>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="nameOfSupplier" className="form-label">
                        Name Of Supplier
                      </label>
                      <p className="form-control">{order.companyName}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="orderNumber" className="form-label">
                        Order Number
                      </label>
                      <p className="form-control">{order.orderNumber}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="dateOfQuoteSubmitted"
                        className="form-label"
                      >
                        Order Date
                      </label>
                      <p className="form-control">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="finalPayableAmount"
                        className="form-label"
                      >
                        Status
                      </label>
                      <p className="form-control">{order.supplierStatus}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="expectedDeliveryDate"
                        className="form-label"
                      >
                        Expected Delivery Date
                      </label>
                      <p className="form-control">
                        {formatDate(order.expectedDeliveryDate)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label
                        htmlFor="actualDeliveryDate"
                        className="form-label"
                      >
                        Actual Delivery Date
                      </label>
                      <p className="form-control">
                        {order.actualDeliveryDate
                          ? formatDate(order.actualDeliveryDate)
                          : "Null"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="invoiceAmtToBuyer" className="form-label">
                        Invoice Amount To Buyer
                      </label>
                      <p className="form-control">
                        {" "}
                        {order.totalAmountBeforeGstAndDiscount}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="taxableValue" className="form-label">
                        Taxable Value
                      </label>
                      <p className="form-control">{order.totalTaxableValue}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="gstAmount" className="form-label">
                        GST Amount
                      </label>
                      <p className="form-control">{order.totalGstAmount}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="totalInvoiceAmt" className="form-label">
                        Total Invoice Amount
                      </label>
                      <p className="form-control">{order.totalAmount}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="advancesRequiredAmount"
                        className="form-label"
                      >
                        Advance Adjustment
                      </label>
                      <p className="form-control">{order.advanceAdjustment}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="otherCharges" className="form-label">
                        Other Charges
                      </label>
                      <p className="form-control">{order.otherCharges}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="finalPayableAmount"
                        className="form-label"
                      >
                        Final Receivable From Edprowise
                      </label>
                      <p className="form-control">
                        {order.finalReceivableFromEdprowise}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="finalPayableAmountWithoutTDS"
                        className="form-label"
                      >
                        Final Payable Amount Without TDS
                      </label>
                      <p className="form-control">
                        {order.finalPayableAmountWithoutTDS}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="finalPayableAmountWithTDS"
                        className="form-label"
                      >
                        Final Payable Amount With TDS
                      </label>
                      <p className="form-control">
                        {order.finalPayableAmountWithTDS}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <Link>
                    {["Ready For Transit", "In-Transit", "Delivered"].includes(
                      order.supplierStatus
                    ) && (
                      <Link
                        onClick={
                          () => fetchInvoiceDataForEdprowise()
                          // i want pass enquiryNumber , sellerId and , schoolId what ever is present in location.state
                        }
                        className="btn btn-soft-info btn-sm"
                        title="Download PDF Invoice For Edprowise"
                        data-bs-toggle="popover"
                        data-bs-trigger="hover"
                      >
                        Download Invoice For Edprowise {}
                        <iconify-icon
                          icon="solar:download-broken"
                          className="align-middle fs-18"
                        />{" "}
                      </Link>
                    )}
                  </Link>

                  <Link>
                    {["Ready For Transit", "In-Transit", "Delivered"].includes(
                      order.supplierStatus
                    ) && (
                      <Link
                        onClick={() => fetchInvoiceDataForBuyer()}
                        className="btn btn-soft-info btn-sm"
                        title="Download PDF Invoice For Buyer"
                        data-bs-toggle="popover"
                        data-bs-trigger="hover"
                      >
                        Download Invoice For Buyer {}
                        <iconify-icon
                          icon="solar:download-broken"
                          className="align-middle fs-18"
                        />{" "}
                      </Link>
                    )}
                  </Link>

                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                  >
                    Pay Online
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Ordered Quote Details
                    </h4>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                    <thead className="bg-light-subtle">
                      <tr>
                        <th style={{ width: 20 }}>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customCheck1"
                            />
                          </div>
                        </th>
                        <th>Enquiry No.</th>
                        <th>Product Required Image & Name</th>
                        <th>Product Required (Category)</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Status</th>
                        <th>Product Description</th>
                        <th>Quote Requested Date</th>
                        <th>Delivery Expected Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quote.length > 0 ? (
                        quote.map((product) => (
                          <tr key={product.id}>
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`customCheck${product.id}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`customCheck${product.id}`}
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>{product.enquiryNumber}</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                {product.productImage && (
                                  <img
                                    className="avatar-md"
                                    alt={product.subCategoryName}
                                    src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${product?.productImage}`}
                                  />
                                )}
                                <Link className="text-dark fw-medium">
                                  {product.subCategoryName}
                                </Link>
                              </div>
                            </td>
                            <td>{product.categoryName}</td>
                            <td>{product.quantity}</td>
                            <td>{product.unit}</td>
                            <td>{product.buyerStatus}</td>
                            <td>{product.description}</td>
                            <td>{formatDate(product.createdAt)}</td>
                            <td>{formatDate(product.expectedDeliveryDate)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* end table-responsive */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewOrderHistory;
