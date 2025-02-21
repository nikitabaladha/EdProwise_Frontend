import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel";
const TrackQuoteTable = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      enquiryNo: "ENQ1234567890",
      imageUrl: "assets/images/product/p-1.png",
      subCategory: "Chair",
      category: "Office Chair",
      productDescription: "We want chair",
      quoteRequestedDate: "2023-12-01",
      unit: "Pieces",
      qty: 8,
      deliveryExpectedDate: "2023-12-01",
      status: "Quote Requested",
      oderNo: "ORD1234567890",
      quoteReceivedDate: "2023-12-01",
    },
    {
      id: 2,
      enquiryNo: "ENQ1234567891",
      imageUrl: "assets/images/product/p-1.png",
      subCategory: "Table",
      category: "Office Table",
      productDescription: "We want Table",
      quoteRequestedDate: "2023-12-01",
      unit: "Pieces",
      qty: 8,
      deliveryExpectedDate: "2023-12-01",
      status: "Quote Requested",
      oderNo: "ORD1234567890",
      quoteReceivedDate: "2023-12-01",
    },
    {
      id: 3,
      enquiryNo: "ENQ1234567892",
      imageUrl: "assets/images/product/p-1.png",
      subCategory: "Board",
      category: "Class Board",
      productDescription: "We want board",
      quoteRequestedDate: "2023-12-01",
      unit: "Pieces",
      qty: 8,
      deliveryExpectedDate: "2023-12-01",
      status: "Quote Requested",
      oderNo: "ORD1234567890",
      quoteReceivedDate: "2023-12-01",
    },
  ]);

  const navigate = useNavigate();

  const navigateToViewRequestedQuote = (event, product) => {
    event.preventDefault();
    navigate(`/seller-dashboard/procurement-services/view-requested-quote`, {
      state: { product },
    });
  };
  const navigateToSubmitQuote = (event, product) => {
    event.preventDefault();
    navigate(`/seller-dashboard/procurement-services/submit-quote`, {
      state: { product },
    });
  };

  const handleExport = () => {
    const filteredData = products.map((product) => ({
      Id: product.id,
      EnquiryNo: product.enquiryNo,
      ProductImage: product.imageUrl,
      ProductName: product.subCategory,
      ProductDescription: product.productDescription,
      QuoteRequestedDate: product.quoteRequestedDate,
      Unit: product.unit,
      Quantity: product.qty,
      DeliveryExpectedDate: product.deliveryExpectedDate,
      Status: product.status,
    }));

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
                  All Requested Quote List
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
                        {/* <th>Product Required (Category)</th> */}
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Status</th>
                        <th>Action</th>
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
                          <td>{product.enquiryNo}</td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-start">
                                <img
                                  src={product.imageUrl}
                                  alt={product.subCategory}
                                  className="avatar-md"
                                />
                              </div>
                              <div>
                                <a
                                  href="#!"
                                  className="text-dark fw-medium fs-15"
                                >
                                  {product.subCategory}
                                </a>
                              </div>
                            </div>
                          </td>
                          {/* <td> {product.category}</td> */}
                          <td>{product.qty}</td>
                          <td>{product.unit}</td>
                          {/* <td>{product.quoteRequestedDate}</td> */}
                          <td>{product.status}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                className="btn btn-light btn-sm"
                                onClick={(event) =>
                                  navigateToViewRequestedQuote(event, product)
                                }
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>

                              <Link
                                className="btn btn-danger btn-sm"
                                title="Submit"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                                onClick={(event) =>
                                  navigateToViewRequestedQuote(event, product)
                                }
                              >
                                Prepare Quote
                              </Link>

                              <Link
                                className="btn btn-success btn-sm"
                                title="Submit"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                                onClick={(event) =>
                                  navigateToSubmitQuote(event, product)
                                }
                              >
                                Submit Quote
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
