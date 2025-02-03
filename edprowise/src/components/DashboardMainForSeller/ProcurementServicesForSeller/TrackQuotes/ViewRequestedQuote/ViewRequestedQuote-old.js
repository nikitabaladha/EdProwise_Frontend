import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrepareQuoteTable from "../PrepareQuoteTable/PrepareQuoteTable";

const ViewRequestedQuote = () => {
  const location = useLocation();

  const [requestedProducts, setRequestedProducts] = useState([
    {
      id: 1,
      enquiryNo: "ENQ1234567890",
      quoteRequestedDate: "2023-12-01",
      category: "Office Furniture",
      subCategory: "Office Chair",
      productDescription: "We want chair",
      qty: 8,
      unit: "Pieces",
      deliveryExpectedDate: "2023-12-05",
      imageUrl: "assets/images/product/p-1.png",
      status: "Quote Requested",
    },
    {
      id: 2,
      enquiryNo: "ENQ1234567890",
      quoteRequestedDate: "2023-12-01",
      category: "Office Furniture",
      subCategory: "Office Chair",
      productDescription: "Need 10 wooden desks.",
      qty: 10,
      unit: "Pieces",
      deliveryExpectedDate: "2023-12-10",
      imageUrl: "assets/images/product/p-2.png",
      status: "Quote Requested",
    },
    {
      id: 3,
      enquiryNo: "ENQ1234567890",
      quoteRequestedDate: "2023-12-01",
      category: "Office Furniture",
      subCategory: "Office Chair",
      productDescription: "Request for 5 whiteboards.",
      qty: 5,
      unit: "Pieces",
      deliveryExpectedDate: "2023-12-12",
      imageUrl: "assets/images/product/p-3.png",
      status: "Quote Requested",
    },
  ]);

  const [prepareProducts, setPrepareProducts] = useState(
    requestedProducts.map((product) => ({
      slNo: "",
      description: "",
      hsnSaac: "",
      listingRate: "",
      edProwiseMargin: "",
      qty: "",
      finalRateBeforeDiscount: "",
      discountPercentage: "",
      finalRate: "",
      taxableValue: "",
      cgstRate: "",
      cgstAmount: "",
      sgstRate: "",
      sgstAmount: "",
      igstRate: "",
      igstAmount: "",
      amountBeforeGST: "",
      discountAmount: "",
      gstAmount: "",
      totalAmount: "",
      productImages: null,
    }))
  );

  const navigate = useNavigate();

  const [isPrepareQuoteTableVisible, setIsPrepareQuoteTableVisible] =
    useState(false);

  const handleExport = (event) => {
    event.preventDefault();
  };

  const handleDownloadPDF = (event, quote) => {
    event.preventDefault();
  };

  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedProducts = [...prepareProducts];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: files ? files[0] : value,
    };
    setPrepareProducts(updatedProducts);
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    const updatedProducts = [...prepareProducts];
    updatedProducts[index].productImages = file; // Store the image file
    setPrepareProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setPrepareProducts([
      ...prepareProducts,
      {
        slNo: "",
        description: "",
        hsnSaac: "",
        listingRate: "",
        edProwiseMargin: "",
        qty: "",
        finalRateBeforeDiscount: "",
        discountPercentage: "",
        finalRate: "",
        taxableValue: "",
        cgstRate: "",
        cgstAmount: "",
        sgstRate: "",
        sgstAmount: "",
        igstRate: "",
        igstAmount: "",
        amountBeforeGST: "",
        discountAmount: "",
        gstAmount: "",
        totalAmount: "",
        productImages: null,
      },
    ]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = prepareProducts.filter((_, i) => i !== index);
    setPrepareProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Prepare Quote Data:", prepareProducts);
    toast.success("Quote prepared successfully!");

    navigate("/seller-dashboard/procurement-services/submit-quote");
  };

  if (!requestedProducts) {
    return <div>No product details available.</div>;
  }

  console.log("Product view", requestedProducts);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Requested Quote Details
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
                      <th>Quote Requested Date</th>
                      <th>Product Description</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>DeliveryExpectedDate</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestedProducts.map((product) => (
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
                              <Link className="text-dark fw-medium fs-15">
                                {product.subCategory}
                              </Link>
                            </div>
                          </div>
                        </td>

                        <td>{product.category}</td>
                        <td>{product.quoteRequestedDate}</td>
                        <td>{product.productDescription}</td>
                        <td>{product.qty}</td>
                        <td>{product.unit}</td>
                        <td>{product.deliveryExpectedDate}</td>
                        <td>{product.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* end table-responsive */}

              <div className="d-flex justify-content-between mt-2">
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button"
                  onClick={() =>
                    setIsPrepareQuoteTableVisible(!isPrepareQuoteTableVisible)
                  }
                >
                  {isPrepareQuoteTableVisible ? "Hide Quote" : "Prepare Quote"}
                </button>
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
      </div>

      {isPrepareQuoteTableVisible && (
        <PrepareQuoteTable
          products={prepareProducts}
          handleRemoveProduct={handleRemoveProduct}
          handleAddProduct={handleAddProduct}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ViewRequestedQuote;
