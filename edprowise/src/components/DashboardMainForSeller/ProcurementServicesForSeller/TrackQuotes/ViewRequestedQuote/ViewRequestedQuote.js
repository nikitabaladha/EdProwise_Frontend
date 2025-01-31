import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrepareQuoteTable from "../PrepareQuoteTable/PrepareQuoteTable";

import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";

import { format } from "date-fns";

//This function takes a date string as an argument and returns a formatted date string
const formatDate = (dateString) => {
  //If the date string is not provided, return "N/A"
  if (!dateString) return "N/A";
  //Otherwise, format the date string using the format function and return the formatted date string
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewRequestedQuote = () => {
  const location = useLocation();
  const enquiryNumber = location.state?.enquiryNumber;

  const navigate = useNavigate();

  const [quote, setQuote] = useState([]);

  useEffect(() => {
    if (!enquiryNumber) return;
    const fetchQuoteData = async () => {
      try {
        const response = await getAPI(
          `/get-according-to-category-filter/${enquiryNumber}`,
          {},
          true
        );

        if (!response.hasError && response.data.data.products) {
          setQuote(response.data.data.products);
          console.log(
            "product data from function",
            response.data.data.products
          );
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching quote:", err);
      }
    };

    fetchQuoteData();
  }, [enquiryNumber]);

  const [prepareProducts, setPrepareProducts] = useState(
    quote.map((product) => ({
      srNo: "",
      subCategoryName: "",
      // quantity: "",
      prepareQuoteImage: null,
    }))
  );

  const [isPrepareQuoteTableVisible, setIsPrepareQuoteTableVisible] =
    useState(false);

  const handleExport = (event) => {
    event.preventDefault();
  };

  const handleDownloadPDF = (event, quote) => {
    event.preventDefault();
  };

  const handleChange = (index, e) => {
    const { name, value, files, type } = e.target;
    const updatedProducts = [...prepareProducts];

    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: type === "file" ? files[0] : value,
    };

    setPrepareProducts(updatedProducts);
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    const updatedProducts = [...prepareProducts];
    updatedProducts[index].productImages = file;
    setPrepareProducts(updatedProducts);
  };

  useEffect(() => {
    setPrepareProducts(
      quote.map((_, index) => ({
        srNo: index + 1,
        subCategoryName: "",
        // quantity: "",
        prepareQuoteImage: null,
      }))
    );
  }, [quote]);

  const handleAddProduct = () => {
    setPrepareProducts((prev) => [
      ...prev,
      {
        srNo: prev.length + 1,
        subCategoryName: "",
        // quantity: "",
        prepareQuoteImage: null,
      },
    ]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = prepareProducts.filter((_, i) => i !== index);
    setPrepareProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        enquiryNumber: enquiryNumber,
        products: [],
      };

      prepareProducts.forEach((product) => {
        data.products.push({
          subcategoryName: product.subCategoryName,
          prepareQuoteImage: product.prepareQuoteImage
            ? product.prepareQuoteImage.name
            : "",
        });
      });

      console.log("Data being sent to backend:", data);

      //   {
      //     "enquiryNumber": "ENQ17382162277852603",
      //     "products": [
      //         {
      //             "subcategoryName": "",
      //             "prepareQuoteImage": ""
      //         },
      //         {
      //             "subcategoryName": "",
      //             "prepareQuoteImage": ""
      //         }
      //     ]
      // }

      const response = await postAPI(
        "/prepare-quote",
        data,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (response.hasError) {
        toast.error(response.message || "Failed to Prepare Quote");
      } else {
        toast.success("Quote prepared successfully");
      }

      // Reset the form after submission
      setPrepareProducts([]);
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
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Status</th>
                      <th>Product Description</th>
                      <th>Quote Requested Date</th>
                      <th>DeliveryExpectedDate</th>
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
                                <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                  <img
                                    className="avatar-md"
                                    alt={product.subCategoryName}
                                    src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${product?.productImage}`}
                                  />
                                </div>
                              )}
                              <div>
                                <Link className="text-dark fw-medium">
                                  {product.subCategoryName}
                                </Link>
                              </div>
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

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const data = new FormData();

//     // Append the enquiry number first
//     data.append("enquiryNumber", enquiryNumber);

//     // Append each product to the FormData
//     prepareProducts.forEach((product, index) => {
//       data.append(
//         `products[${index}].subcategoryName`,
//         product.subCategoryName
//       );
//       if (product.prepareQuoteImage) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           data.append(`products[${index}].prepareQuoteImage`, reader.result);
//         };
//         reader.readAsDataURL(product.prepareQuoteImage);
//       } else {
//         data.append(`products[${index}].prepareQuoteImage`, "");
//       }
//     });

//     const response = await postAPI(
//       "/prepare-quote",
//       data,
//       {
//         "Content-Type": "multipart/form-data",
//       },
//       true
//     );

//     if (response.hasError) {
//       toast.error(response.message || "Failed to Prepare Quote");
//     } else {
//       toast.success("Quote prepared successfully");
//     }

//     // Reset the form after submission
//     setPrepareProducts([]);
//   } catch (error) {
//     toast.error(
//       error?.response?.data?.message ||
//         "An unexpected error occurred. Please try again."
//     );
//   }
// };
