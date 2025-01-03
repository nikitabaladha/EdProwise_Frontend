import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePreparedQuote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  console.log("update page", product);
  console.log("update location", location);

  const [formData, setFormData] = useState({
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
    amountBeforeGSTAndDiscount: "",
    discountAmount: "",
    gstAmount: "",
    totalAmount: "",
    productImages: null,
  });

  //   {
  //     "id": 1,
  //     "slNo": 1,
  //     "description": "School Bench",
  //     "hsnSaac": "654321",
  //     "listingRate": "1,000.00",
  //     "edProwiseMargin": "12.50%",
  //     "qty": "100",
  //     "finalRateBeforeDiscount": "1,125.00",
  //     "discountPercentage": "15.00%",
  //     "finalRate": "956.25",
  //     "taxableValue": "95,625.00",
  //     "cgstRate": "6.25%",
  //     "cgstAmount": "5,976.56",
  //     "sgstRate": "6.25%",
  //     "sgstAmount": "5,976.56",
  //     "igstRate": "12.50%",
  //     "igstAmount": "11,953.13",
  //     "amountBeforeGSTAndDiscount": "112,500.00",
  //     "discountAmount": "16,875.00",
  //     "gstAmount": "11,953.13",
  //     "totalAmount": "124,382.82",
  //     "productImages": null
  // }

  useEffect(() => {
    if (product) {
      // setFormData({
      //   slNo: product.slNo,
      //   description: product.description,
      //   hsnSaac: product.hsnSaac,
      //   listingRate: product.listingRate,
      //   edProwiseMargin: product.edProwiseMargin,
      //   qty: product.qty,
      //   finalRateBeforeDiscount: product.finalRateBeforeDiscount,
      //   discountPercentage: product.discountPercentage,
      //   finalRate: product.finalRate,
      //   taxableValue: product.taxableValue,
      //   cgstRate: product.cgstRate,
      //   cgstAmount: product.cgstAmount,
      //   sgstRate: product.sgstRate,
      //   sgstAmount: product.sgstAmount,
      //   igstRate: product.igstRate,
      //   igstAmount: product.igstAmount,
      //   amountBeforeGSTAndDiscount: product.amountBeforeGSTAndDiscount,
      //   discountAmount: product.discountAmount,
      //   gstAmount: product.gstAmount,
      //   totalAmount: product.totalAmount,
      //   productImages: product.productImages,
      // });

      setFormData({
        ...product,
        listingRate: product.listingRate.replace(/,/g, ""),
        edProwiseMargin: product.edProwiseMargin.replace(/%/g, ""),
        finalRateBeforeDiscount: product.finalRateBeforeDiscount.replace(
          /,/g,
          ""
        ),
        discountPercentage: product.discountPercentage.replace(/%/g, ""),
        taxableValue: product.taxableValue.replace(/,/g, ""),
        cgstRate: product.cgstRate.replace(/%/g, ""),
        cgstAmount: product.cgstAmount.replace(/,/g, ""),
        sgstRate: product.sgstRate.replace(/%/g, ""),
        sgstAmount: product.sgstAmount.replace(/,/g, ""),
        igstRate: product.igstRate.replace(/%/g, ""),
        igstAmount: product.igstAmount.replace(/,/g, ""),
        amountBeforeGSTAndDiscount: product.amountBeforeGSTAndDiscount.replace(
          /,/g,
          ""
        ),
        discountAmount: product.discountAmount.replace(/,/g, ""),
        gstAmount: product.gstAmount.replace(/,/g, ""),
        totalAmount: product.totalAmount.replace(/,/g, ""),
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Updating form data:`, formData);

    toast.success("Quote updated successfully!");

    setFormData({
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
      amountBeforeGSTAndDiscount: "",
      discountAmount: "",
      gstAmount: "",
      totalAmount: "",
      productImages: null,
    });

    navigate(-1);
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
                    Update Prepared Quote
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="slNo" className="form-label">
                        Serial Number
                      </label>
                      <input
                        type="text"
                        id="slNo"
                        name="slNo"
                        className="form-control"
                        value={formData.slNo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="hsnSaac" className="form-label">
                        HSN/SAC Code
                      </label>
                      <input
                        type="text"
                        id="hsnSaac"
                        name="hsnSaac"
                        className="form-control"
                        value={formData.hsnSaac}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="listingRate" className="form-label">
                        Listing Rate
                      </label>
                      <input
                        type="number"
                        id="listingRate"
                        name="listingRate"
                        className="form-control"
                        value={formData.listingRate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="edProwiseMargin" className="form-label">
                        ED Prowise Margin
                      </label>
                      <input
                        type="number"
                        id="edProwiseMargin"
                        name="edProwiseMargin"
                        className="form-control"
                        value={formData.edProwiseMargin}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="qty" className="form-label">
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="qty"
                        name="qty"
                        className="form-control"
                        value={formData.qty}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="finalRateBeforeDiscount"
                        className="form-label"
                      >
                        Final Rate Before Discount{" "}
                        {formData.finalRateBeforeDiscount}
                      </label>
                      <input
                        type="number"
                        id="finalRateBeforeDiscount"
                        name="finalRateBeforeDiscount"
                        className="form-control"
                        value={formData.finalRateBeforeDiscount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="discountPercentage"
                        className="form-label"
                      >
                        Discount Percentage {formData.discountPercentage}
                      </label>
                      <input
                        type="number"
                        id="discountPercentage"
                        name="discountPercentage"
                        className="form-control"
                        value={formData.discountPercentage}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="finalRate" className="form-label">
                        Final Rate
                      </label>
                      <input
                        type="number"
                        id="finalRate"
                        name="finalRate"
                        className="form-control"
                        value={formData.finalRate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="taxableValue" className="form-label">
                        Taxable Value {formData.taxableValue}
                      </label>
                      <input
                        type="number"
                        id="taxableValue"
                        name="taxableValue"
                        className="form-control"
                        value={formData.taxableValue}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="cgstRate" className="form-label">
                        CGST Rate {formData.cgstRate}
                      </label>
                      <input
                        type="number"
                        id="cgstRate"
                        name="cgstRate"
                        className="form-control"
                        value={formData.cgstRate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="cgstAmount" className="form-label">
                        CGST Amount {formData.cgstAmount}
                      </label>
                      <input
                        type="number"
                        id="cgstAmount"
                        name="cgstAmount"
                        className="form-control"
                        value={formData.cgstAmount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="sgstRate" className="form-label">
                        SGST Rate {formData.sgstRate}
                      </label>
                      <input
                        type="number"
                        id="sgstRate"
                        name="sgstRate"
                        className="form-control"
                        value={formData.sgstRate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="sgstAmount" className="form-label">
                        SGST Amount {formData.sgstAmount}
                      </label>
                      <input
                        type="number"
                        id="sgstAmount"
                        name="sgstAmount"
                        className="form-control"
                        value={formData.sgstAmount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="igstRate" className="form-label">
                        IGST Rate {formData.igstRate}
                      </label>
                      <input
                        type="number"
                        id="igstRate"
                        name="igstRate"
                        className="form-control"
                        value={formData.igstRate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="igstAmount" className="form-label">
                        IGST Amount {formData.igstAmount}
                      </label>
                      <input
                        type="number"
                        id="igstAmount"
                        name="igstAmount"
                        className="form-control"
                        value={formData.igstAmount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="discountAmount" className="form-label">
                        Discount Amount {formData.discountAmount}
                      </label>
                      <input
                        type="number"
                        id="discountAmount"
                        name="discountAmount"
                        className="form-control"
                        value={formData.discountAmount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="gstAmount" className="form-label">
                        GST Amount {formData.gstAmount}
                      </label>
                      <input
                        type="number"
                        id="gstAmount"
                        name="gstAmount"
                        className="form-control"
                        value={formData.gstAmount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="amountBeforeGSTAndDiscount"
                        className="form-label"
                      >
                        Amount Before GST and Discount{" "}
                        {formData.amountBeforeGSTAndDiscount}
                      </label>
                      <input
                        type="number"
                        id="amountBeforeGSTAndDiscount"
                        name="amountBeforeGSTAndDiscount"
                        className="form-control"
                        value={formData.amountBeforeGSTAndDiscount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="totalAmount" className="form-label">
                        Total Amount {formData.totalAmount}
                      </label>
                      <input
                        type="number"
                        id="totalAmount"
                        name="totalAmount"
                        className="form-control"
                        value={formData.totalAmount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  {/* <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="productImages" className="form-label">
                        Product Images
                      </label>
                      <input
                        type="file"
                        id="productImages"
                        name="productImages"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        value={formData.productImages}
                      />
                    </div>
                  </div> */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="productImages" className="form-label">
                        Product Images
                      </label>

                      {/* Display Existing Image or File */}
                      {formData.productImages && (
                        <>
                          {formData.productImages.endsWith(".pdf") ? (
                            <a
                              href={formData.productImages}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View PDF
                            </a>
                          ) : (
                            <img
                              src={formData.productImages}
                              alt="Existing Product"
                              className="img-thumbnail"
                              style={{ maxWidth: "100px", maxHeight: "100px" }}
                            />
                          )}
                        </>
                      )}

                      {/* File Input for Upload */}
                      <input
                        type="file"
                        id="productImages"
                        name="productImages"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFormData((prev) => ({
                            ...prev,
                            productImages: file,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Request Quote
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

export default UpdatePreparedQuote;
