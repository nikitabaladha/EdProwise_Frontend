import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel";
const TrackQuoteTable = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      enquiryNo: "ENQ1234567890",
      nameOfBuyer: "ABC School",
      quoteRequestedDate: "2023-12-01",
      subCategory: "Chair",
      productDescription: "We want chair",
      qty: 8,
      unit: "Pieces",
      deliveryExpectedDate: "2023-12-05",
      imageUrl: "assets/images/product/p-1.png",
      status: "Quote Requested",
    },
    {
      id: 2,
      enquiryNo: "ENQ1234567891",
      nameOfBuyer: "XYZ Academy",
      quoteRequestedDate: "2023-12-02",
      subCategory: "Desk",
      productDescription: "Need 10 wooden desks.",
      qty: 10,
      unit: "Pieces",
      deliveryExpectedDate: "2023-12-10",
      imageUrl: "assets/images/product/p-2.png",
      status: "Quote Requested",
    },
    {
      id: 3,
      enquiryNo: "ENQ1234567892",
      nameOfBuyer: "LMN School",
      quoteRequestedDate: "2023-12-03",
      subCategory: "Whiteboard",
      productDescription: "Request for 5 whiteboards.",
      qty: 5,
      unit: "Pieces",
      deliveryExpectedDate: "2023-12-12",
      imageUrl: "assets/images/product/p-3.png",
      status: "Quote Requested",
    },
    {
      id: 4,
      enquiryNo: "ENQ1234567893",
      nameOfBuyer: "PQR Institute",
      quoteRequestedDate: "2023-12-04",
      subCategory: "Projector",
      productDescription: "Looking for a high-quality projector.",
      qty: 2,
      unit: "Pieces",
      deliveryExpectedDate: "2023-12-15",
      imageUrl: "assets/images/product/p-4.png",
      status: "Quote Requested",
    },
    {
      id: 5,
      enquiryNo: "ENQ1234567894",
      nameOfBuyer: "DEF School",
      quoteRequestedDate: "2023-12-05",
      subCategory: "Books",
      productDescription: "Request for 100 textbooks.",
      qty: 100,
      unit: "Pieces",
      deliveryExpectedDate: "2023-12-20",
      imageUrl: "assets/images/product/p-5.png",
      status: "Quote Requested",
    },
  ]);

  const navigate = useNavigate();

  const navigateToRequestQuote = (event) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/request-quote`);
  };

  const navigateToViewRequestedQuote = (event, product) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/view-requested-quote`, {
      state: { product },
    });
  };

  const navigateToUpdateRequestedQuote = (event, product) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/update-requested-quote`, {
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
                  All Request Quote List
                </h4>
                <Link
                  onClick={(event) => navigateToRequestQuote(event)}
                  className="btn btn-sm btn-primary"
                >
                  Request Quote
                </Link>
                <div className="text-end">
                  <Link
                    onClick={handleExport}
                    className="btn btn-sm btn-outline-light"
                    title="Export Excel File"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover"
                  >
                    Export
                  </Link>
                </div>
              </div>
              <div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered">
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

                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Quote Requested Date</th>
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
                              <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
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

                          <td>{product.qty}</td>
                          <td>{product.unit}</td>
                          <td>{product.quoteRequestedDate}</td>
                          <td>{product.status}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                className="btn btn-light btn-sm"
                                title="View"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
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
                                className="btn btn-soft-primary btn-sm"
                                title="Update"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                                onClick={(event) =>
                                  navigateToUpdateRequestedQuote(event, product)
                                }
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-danger btn-sm"
                                title="Delete"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                              >
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"
                                />
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
