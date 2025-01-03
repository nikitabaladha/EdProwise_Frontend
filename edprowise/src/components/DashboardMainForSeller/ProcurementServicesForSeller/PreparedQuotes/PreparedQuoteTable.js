import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { exportToExcel } from "../../../export-excel";

const PreparedQuoteTable = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      slNo: 1,
      description: "School Bench",
      hsnSaac: "654321",
      listingRate: "1,000.00",
      edProwiseMargin: "12.50%",
      qty: "100",
      finalRateBeforeDiscount: "1,125.00",
      discountPercentage: "15.00%",
      finalRate: "956.25",
      taxableValue: "95,625.00",
      cgstRate: "6.25%",
      cgstAmount: "5,976.56",
      sgstRate: "6.25%",
      sgstAmount: "5,976.56",
      igstRate: "12.50%",
      igstAmount: "11,953.13",
      amountBeforeGSTAndDiscount: "112,500.00",
      discountAmount: "16,875.00",
      gstAmount: "11,953.13",
      totalAmount: "124,382.82",
      productImages: "images/product1.jpg",
    },
    {
      id: 2,
      slNo: 2,
      description: "School Bench",
      hsnSaac: "654321",
      listingRate: "1,000.00",
      edProwiseMargin: "12.50%",
      qty: "100",
      finalRateBeforeDiscount: "1,125.00",
      discountPercentage: "15.00%",
      finalRate: "956.25",
      taxableValue: "95,625.00",
      cgstRate: "6.25%",
      cgstAmount: "5,976.56",
      sgstRate: "6.25%",
      sgstAmount: "5,976.56",
      igstRate: "12.50%",
      igstAmount: "11,953.13",
      amountBeforeGSTAndDiscount: "112,500.00",
      discountAmount: "16,875.00",
      gstAmount: "11,953.13",
      totalAmount: "124,382.82",
      productImages: "images/product1.jpg",
    },
  ]);

  const navigate = useNavigate();

  const navigateToPrepareQuote = (event) => {
    event.preventDefault();
    navigate(`/seller-dashboard/procurement-services/prepare-quote`);
  };

  const navigateToViewRequestedQuote = (event, product) => {
    event.preventDefault();
    navigate(`/seller-dashboard/procurement-services/view-requested-quote`, {
      state: { product },
    });
  };

  const navigateToUpdateRequestedQuote = (event, product) => {
    console.log("product form navigation to update", product);
    event.preventDefault();
    navigate(`/seller-dashboard/procurement-services/update-prepared-quote`, {
      state: { product },
    });
  };

  const handleExport = () => {
    const filteredData = products.map((product) => ({
      Id: product.id,
      Description: product.description,
      HSN_SAAC: product.hsnSaac,
      Listing_Rate: product.listingRate,
      Ed_Prowise_Margin: product.edProwiseMargin,
      Quantity: product.qty,
      Final_Rate_Before_Discount: product.finalRateBeforeDiscount,
      Discount_Percentage: product.discountPercentage,
      Final_Rate: product.finalRate,
      Taxable_Value: product.taxableValue,
      CGST_Rate: product.cgstRate,
      CGST_Amount: product.cgstAmount,
      SGST_Rate: product.sgstRate,
      SGST_Amount: product.sgstAmount,
      IGST_Rate: product.igstRate,
      IGST_Amount: product.igstAmount,
      Amount_Before_GST_And_Discount: product.amountBeforeGSTAndDiscount,
      Discount_Amount: product.discountAmount,
      GST_Amount: product.gstAmount,
      Total_Amount: product.totalAmount,
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
                      <th>Sl No</th>
                      <th>Description</th>
                      <th>HSN/SAAC</th>
                      <th>Listing Rate</th>
                      <th>Ed Prowise Margin</th>
                      <th>Quantity</th>
                      <th>Final Rate Before Discount</th>
                      <th>Discount Percentage</th>
                      {/* <th>Final Rate</th>
                      <th>Taxable Value</th>
                      <th>CGST Rate</th>
                      <th>CGST Amount</th>
                      <th>SGST Rate</th>
                      <th>SGST Amount</th>
                      <th>IGST Rate</th>
                      <th>IGST Amount</th>
                      <th>Amount Before GST and Discount</th>
                      <th>Discount Amount</th>
                      <th>GST Amount</th>
                      <th>Total Amount</th> */}
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
                        <td>{product.slNo}</td>
                        <td>{product.description}</td>
                        <td>{product.hsnSaac}</td>
                        <td>{product.listingRate}</td>
                        <td>{product.edProwiseMargin}</td>
                        <td>{product.qty}</td>
                        <td>{product.finalRateBeforeDiscount}</td>
                        <td>{product.discountPercentage}</td>
                        {/* <td>{product.finalRate}</td>
                        <td>{product.taxableValue}</td>
                        <td>{product.cgstRate}</td>
                        <td>{product.cgstAmount}</td>
                        <td>{product.sgstRate}</td>
                        <td>{product.sgstAmount}</td>
                        <td>{product.igstRate}</td>
                        <td>{product.igstAmount}</td>
                        <td>{product.amountBeforeGSTAndDiscount}</td>
                        <td>{product.discountAmount}</td>
                        <td>{product.gstAmount}</td>
                        <td>{product.totalAmount}</td> */}
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
                              className="btn btn-soft-primary btn-sm"
                              onClick={(event) =>
                                navigateToUpdateRequestedQuote(event, product)
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
  );
};

export default PreparedQuoteTable;
