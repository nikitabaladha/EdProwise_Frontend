import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
                    <th>Subcategory Name</th>
                    <th>HSN/SAAC</th>
                    <th>Listing Rate</th>
                    <th>EdProwise Margin %</th>
                    <th>Quantity</th>
                    <th>Discount %</th>
                    <th>CGST Rate</th>
                    <th>SGST Rate</th>
                    <th>IGST Rate</th>
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
                      <td>
                        <input
                          type="text"
                          name="subCategoryName"
                          className="form-control"
                          value={product.subCategoryName || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="hsnSacc"
                          className="form-control"
                          value={product.hsnSacc || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="listingRate"
                          className="form-control"
                          value={product.listingRate || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="edprowiseMargin"
                          className="form-control"
                          value={product.edprowiseMargin || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="quantity"
                          className="form-control"
                          value={product.quantity || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          name="discount"
                          className="form-control"
                          value={product.discount || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          name="cgstRate"
                          className="form-control"
                          value={product.cgstRate || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          name="sgstRate"
                          className="form-control"
                          value={product.sgstRate || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          name="igstRate"
                          className="form-control"
                          value={product.igstRate || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>

                      <td>
                        <input
                          type="file"
                          name="prepareQuoteImage"
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
