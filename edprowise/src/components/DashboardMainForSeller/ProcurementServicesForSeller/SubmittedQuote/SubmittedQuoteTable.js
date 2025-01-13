import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { exportToExcel } from "../../../export-excel";

const SubmittedQuoteTable = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      dateOfQuoteSubmitted: "2023-12-01",
      quotedAmount: "1000",
      description: "XYZ",
      remarksFromSupplier: "XYZ",
      expectedDeliveryDateMentionedBySeller: "2023-12-01",
      paymentTerms: "XYZ",
      advancesRequiredAmount: "500",
    },
  ]);

  const navigate = useNavigate();

  const navigateToPrepareQuote = (event) => {
    event.preventDefault();
    navigate(`/seller-dashboard/procurement-services/prepare-quote`);
  };

  const navigateToViewSubmittedQuote = (event, product) => {
    event.preventDefault();
    navigate(`/seller-dashboard/procurement-services/view-submitted-quote`, {
      state: { product },
    });
  };

  const navigateToUpdateSubmittedQuote = (event, product) => {
    event.preventDefault();
    navigate(`/seller-dashboard/procurement-services/update-submitted-quote`, {
      state: { product },
    });
  };

  const handleExport = () => {
    const filteredData = products.map((product) => ({
      Id: product.id,
      DateOfQuoteSubmitted: product.dateOfQuoteSubmitted,
      QuotedAmount: product.quotedAmount,
      RemarksFromSupplier: product.remarksFromSupplier,
      ExpectedDeliveryDate: product.expectedDeliveryDateMentionedBySeller,
      PaymentTerms: product.paymentTerms,
      AdvancesRequiredAmount: product.advancesRequiredAmount,
      description: product.description,
    }));

    exportToExcel(filteredData, "Products", "Products Data");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center gap-1">
              <h4 className="card-title flex-grow-1">
                All Submitted Quote List
              </h4>
              {/* <Link
                onClick={(event) => navigateToRequestQuote(event)}
                className="btn btn-sm btn-primary"
              >
                Request Quote
              </Link> */}
              <div className="text-end">
                <Link
                  onClick={handleExport}
                  className="btn btn-sm btn-outline-light"
                >
                  Export
                </Link>
              </div>
            </div>
            <div>
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
                      <th>Date of Quote Submitted</th>
                      <th>Quoted Amount</th>
                      <th>Description</th>
                      <th>Remarks from Supplier</th>
                      <th>Expected Delivery Date</th>
                      <th>Payment Terms</th>
                      <th>Advances Required Amount</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
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
                        <td>{product.dateOfQuoteSubmitted}</td>
                        <td>{product.quotedAmount}</td>
                        <td>{product.description}</td>
                        <td>{product.remarksFromSupplier}</td>
                        <td>{product.expectedDeliveryDateMentionedBySeller}</td>
                        <td>{product.paymentTerms}</td>
                        <td>{product.advancesRequiredAmount}</td>
                        {/* <td>
                          <div className="d-flex gap-2">
                            <Link
                              className="btn btn-light btn-sm"
                              onClick={(event) =>
                                navigateToViewSubmittedQuote(event, product)
                              }
                            >
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </Link>

                            <Link
                              className="btn btn-soft-primary btn-sm"
                              onClick={(event) =>
                                navigateToUpdateSubmittedQuote(event, product)
                              }
                            >
                              <iconify-icon
                                icon="solar:pen-2-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                            <Link className="btn btn-soft-danger btn-sm">
                              <iconify-icon
                                icon="solar:trash-bin-minimalistic-2-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                          </div>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="card-footer border-top">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mb-0">
                  <li className="page-item">
                    <Link className="page-link">Previous</Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link">1</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link">2</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link">3</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link">Next</Link>
                  </li>
                </ul>
              </nav>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmittedQuoteTable;
