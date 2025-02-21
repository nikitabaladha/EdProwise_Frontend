import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel";
import getAPI from "../../../../api/getAPI";

const TrackQuoteTable = ({}) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        const response = await getAPI(`/get-quote-for-admin`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setQuotes(response.data.data);
          console.log("Quote data", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching quote:", err);
      }
    };

    fetchQuoteData();
  }, []);

  const navigate = useNavigate();

  const navigateToViewRequestedQuote = (event, enquiryNumber) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/view-requested-quote`, {
      state: { enquiryNumber },
    });
  };

  const navigateToViewQuoteTable = (event, enquiryNumber, schoolId) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/view-quote-table`, {
      state: { enquiryNumber, schoolId },
    });
  };

  const handleExport = () => {
    const filteredData = quotes.map((quote) => ({}));

    exportToExcel(filteredData, "Products", "Products Data");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">
                  All Request Quote List
                </h4>

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
                {quotes.length > 0 ? (
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
                          <th className="text-start">
                            Product Required Image & Name
                          </th>
                          <th>Product Required (Category)</th>
                          <th>Quantity</th>
                          <th>Unit</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quotes.map((quote) => (
                          <tr key={quote.id}>
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`customCheck${quote.id}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`customCheck${quote.id}`}
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>{quote.enquiryNumber}</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                {quote.productImage && (
                                  <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                    <img
                                      className="avatar-md"
                                      alt={quote.subCategoryName}
                                      src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${quote?.productImage}`}
                                    />
                                  </div>
                                )}
                                <div>
                                  <Link className="text-dark fw-medium">
                                    {quote.subCategoryName}
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td>{quote.categoryName}</td>
                            <td>{quote.quantity}</td>
                            <td>{quote.unit}</td>
                            <td>{quote.edprowiseStatus}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <Link
                                  className="btn btn-light btn-sm"
                                  onClick={(event) =>
                                    navigateToViewRequestedQuote(
                                      event,
                                      quote?.enquiryNumber,
                                      quote?.schoolId
                                    )
                                  }
                                >
                                  <iconify-icon
                                    icon="solar:eye-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                                <button
                                  type="button"
                                  className="btn btn-primary custom-submit-button"
                                  onClick={(event) =>
                                    navigateToViewQuoteTable(
                                      event,
                                      quote?.enquiryNumber,
                                      quote?.schoolId
                                    )
                                  }
                                >
                                  View Quote
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <tr></tr>
                )}
                {/* end table-responsive */}
              </div>
              <div className="card-footer border-top">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackQuoteTable;
