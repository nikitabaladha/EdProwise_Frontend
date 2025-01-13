import React from "react";
import { Link } from "react-router-dom";

const PrepareQuoteTable = ({
  products,
  handleRemoveProduct,
  handleAddProduct,
  handleChange,
  handleImageChange,
  handleSubmit,
}) => {
  return (
    <div className="row p-2">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center gap-1">
            <button
              type="button"
              className="btn btn-primary custom-submit-button"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
            <h4 className="card-title flex-grow-1 m-0 text-center">
              Prepare Quote
            </h4>
            <div className="text-end">
              <Link className="btn btn-sm btn-outline-light">Export</Link>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Action</th>
                    <th>Sr No.</th>
                    <th>Description</th>
                    <th>HSN/SAAC</th>
                    <th>Listing Rate</th>
                    <th>EdProwise Margin%</th>
                    <th>Quantity</th>
                    <th>Final Rate Before Discount</th>
                    <th>Discount %</th>
                    <th>Final Rate</th>
                    <th>Taxable Value</th>
                    <th>CGST Rate</th>
                    <th>CGST Amount</th>
                    <th>SGST Rate</th>
                    <th>SGST Amount</th>
                    <th>IGST Rate</th>
                    <th>IGST Amount</th>
                    <th>Amount Before GST & Discount</th>
                    <th>Discount Amount</th>
                    <th>GST Amount</th>
                    <th>Total Amount</th>
                    <th>Upload Sample Images of Products</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>
                        {products.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-primary custom-submit-button"
                            onClick={() => handleRemoveProduct(index)}
                          >
                            Remove
                          </button>
                        )}
                      </td>
                      <td>{index + 1}</td>
                      {[
                        "description",
                        "hsnSaac",
                        "listingRate",
                        "edProwiseMargin",
                        "qty",
                        "finalRateBeforeDiscount",
                        "discountPercentage",
                        "finalRate",
                        "taxableValue",
                        "cgstRate",
                        "cgstAmount",
                        "sgstRate",
                        "sgstAmount",
                        "igstRate",
                        "igstAmount",
                        "amountBeforeGST",
                        "discountAmount",
                        "gstAmount",
                        "totalAmount",
                      ].map((field, i) => (
                        <td key={i}>
                          <input
                            type="text"
                            name={field}
                            className="form-control"
                            value={product[field]}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </td>
                      ))}
                      <td>
                        <input
                          type="file"
                          name="sampleImage"
                          className="form-control"
                          onChange={(e) => handleImageChange(index, e)}
                          accept="image/*"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-end m-2">
              <button type="submit" className="btn btn-success me-2">
                Submit
              </button>
              <button type="button" className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrepareQuoteTable;
